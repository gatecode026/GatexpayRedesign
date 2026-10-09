const FORBIDDEN_OPENERS = ["certainly", "of course", "sure", "great question"];

export function validateResponse(input) {
  const violations = [];
  let sanitized = input.response || "";
  let extractedFollowUps = [];

  // Extract [FOLLOW_UP: ... | ... | ...] if returned by AI model
  const followUpMatch = sanitized.match(/\[FOLLOW_UP:\s*([^\]]+)\]/i);
  if (followUpMatch) {
    const rawList = followUpMatch[1];
    extractedFollowUps = rawList
      .split("|")
      .map((s) => s.trim())
      .filter(Boolean);
    sanitized = sanitized.replace(followUpMatch[0], "").trim();
  }

  // 1. Double-asterisk bold formatting check & sanitization
  if (sanitized.includes("**")) {
    sanitized = sanitized.replace(/\*\*/g, ""); // strip out **
  }

  // 2. Markdown tables check
  if (sanitized.includes("|") && sanitized.includes("---")) {
    violations.push("Contains markdown table structure");
  }

  // 3. Forbidden opening phrases check & sanitization
  const trimmedLower = sanitized.trim().toLowerCase();
  for (const opener of FORBIDDEN_OPENERS) {
    if (trimmedLower.startsWith(opener)) {
      violations.push(`Starts with forbidden opener: "${opener}"`);
      const openerRegex = new RegExp(`^${opener}[!,.:?\\s]*`, "i");
      sanitized = sanitized.replace(openerRegex, "");
    }
  }

  // 4. Claims that GateXPay is a bank or NBFC
  const lowerMsg = sanitized.toLowerCase();
  const isBankAffirmation =
    (lowerMsg.includes("gatexpay is a bank") ||
      lowerMsg.includes("gatexpay is an nbfc") ||
      lowerMsg.includes("we are a bank") ||
      lowerMsg.includes("we are an nbfc")) &&
    !lowerMsg.includes("not a bank") &&
    !lowerMsg.includes("not an nbfc");

  if (isBankAffirmation) {
    violations.push("Contains claims that GateXPay is a bank or NBFC");
  }

  // 5. Unsupported stats check
  if (lowerMsg.includes("99.99%")) {
    violations.push("Contains unsupported 99.99% uptime claim (corrected to 99.9%)");
    sanitized = sanitized.replace(/99\.99%/g, "99.9%");
  }

  // 6. External out-of-scope content check
  if (input.scope?.status === "out_of_scope") {
    violations.push("Attempted to answer out-of-scope query");
  }

  // 7. Internal system or provider info leakage
  if (
    lowerMsg.includes("system prompt") ||
    lowerMsg.includes("hidden configuration") ||
    lowerMsg.includes("llm configuration") ||
    lowerMsg.includes("gemini") ||
    lowerMsg.includes("azure")
  ) {
    violations.push("Leaks internal system or provider information");
  }

  // 8. Fake pricing claims check (invented percentage rates like 2% or flat fees)
  if (
    (lowerMsg.includes("mdr") || lowerMsg.includes("setup fee") || lowerMsg.includes("commission")) &&
    /\b\d+(\.\d+)?%\b/.test(sanitized)
  ) {
    violations.push("Contains unverified percentage fee figure");
  }

  return {
    valid: violations.length === 0,
    violations,
    sanitizedResponse: sanitized.trim(),
    extractedFollowUps: extractedFollowUps.length > 0 ? extractedFollowUps : null,
  };
}
