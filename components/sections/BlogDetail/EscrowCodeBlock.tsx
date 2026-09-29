export default function EscrowCodeBlock() {
  return (
    <div className="escrow-code-block-wrap">
      <pre className="escrow-code-pre" tabIndex={0}>
        <code>
          <span className="code-comment">
            {"// Example: Webhook payload for escrow credit notification\n"}
          </span>
          {"{\n"}
          {"  "}
          <span className="code-key">&quot;event&quot;</span>:{" "}
          <span className="code-str">&quot;escrow.credit&quot;</span>,{"\n"}
          {"  "}
          <span className="code-key">&quot;merchant_id&quot;</span>:{" "}
          <span className="code-str">&quot;MERCH_839210&quot;</span>,{"\n"}
          {"  "}
          <span className="code-key">&quot;amount&quot;</span>:{" "}
          <span className="code-num">145000</span>,{" "}
          <span className="code-comment">{"// in paise\n"}</span>
          {"  "}
          <span className="code-key">&quot;currency&quot;</span>:{" "}
          <span className="code-str">&quot;INR&quot;</span>,{"\n"}
          {"  "}
          <span className="code-key">&quot;credited_at&quot;</span>:{" "}
          <span className="code-str">&quot;2026-09-12T14:32:01Z&quot;</span>,{"\n"}
          {"  "}
          <span className="code-key">&quot;settlement_due_by&quot;</span>:{" "}
          <span className="code-str">&quot;2026-09-13T12:00:00Z&quot;</span>,{" "}
          <span className="code-comment">{"// T+1\n"}</span>
          {"  "}
          <span className="code-key">&quot;is_nodal_cut&quot;</span>:{" "}
          <span className="code-bool">false</span>
          {"\n}"}
        </code>
      </pre>
    </div>
  );
}
