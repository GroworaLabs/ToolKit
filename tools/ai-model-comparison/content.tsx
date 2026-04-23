export default function AiModelComparisonContent() {
  return (
    <div className="tool-content">
      <h2>How to use this tool</h2>
      <p>
        The AI Model Comparison tool covers 19 large language models across 7 providers as of April 2026.
        Use the filter chips to narrow by tier (Frontier, Mid, Fast / Cheap), reasoning models, or open-weights models.
        Sort by input price, output price, context window, or model name. Switch between card grid and table view
        depending on whether you want a visual overview or a dense sortable table.
      </p>
      <p>
        To compare models side-by-side: click up to 3 model cards (or table rows) to select them — a bar appears at the
        bottom of the screen. Once 2 or more are selected, click <strong>Compare →</strong> to see a full attribute
        comparison with <strong>★ best</strong> highlights on the winning value for each metric (cheapest price,
        largest context window).
      </p>

      <h2>Model tiers explained</h2>
      <p>
        Models in this table are grouped into three tiers, which reflect a rough cost-capability tradeoff rather than
        a strict benchmark ranking.
      </p>
      <ul>
        <li>
          <strong>Frontier</strong> — GPT-5, o3, Claude Opus 4.7, Gemini 2.5 Pro, Grok 3. These models lead on
          capability benchmarks (MMLU, HumanEval, MATH, GPQA). They charge premium rates: $1.25–$15 per million input
          tokens, $10–$75 per million output tokens. Use them when you need the best possible quality on hard reasoning,
          complex code, or long multi-document tasks.
        </li>
        <li>
          <strong>Mid-tier</strong> — GPT-4o, o4-mini, Claude Sonnet 4.6, Gemini 2.5 Flash, Grok 3 mini, DeepSeek V3/R1,
          Llama 4 Maverick, Mistral Large. These are within 10–20 percentage points of frontier on most benchmarks,
          but cost 3–10× less. For the majority of production workloads (coding assistants, summarization, RAG retrieval,
          customer service bots), a mid-tier model is the right default choice.
        </li>
        <li>
          <strong>Fast / Cheap</strong> — GPT-4o mini, Claude Haiku 4.5, Gemini 2.0 Flash, Llama 4 Scout, Mistral Small.
          Under $1 per million input tokens. Ideal for high-volume classification, keyword extraction, structured output
          generation, or any task where you can measure quality empirically and it passes your bar. At 50–150× cheaper
          than frontier, the economics for large-scale offline workloads are very compelling.
        </li>
      </ul>

      <h2>Reasoning and thinking models</h2>
      <p>
        A subset of models in this table are "reasoning" models — they internally generate extended chains of thought
        before producing a final answer. This dramatically improves performance on multi-step math, competitive
        programming, scientific research questions, and complex logical deduction. The models with this capability
        in this table are:
      </p>
      <ul>
        <li><strong>OpenAI o3 and o4-mini</strong> — OpenAI's dedicated reasoning series. o3 benchmarks at or above PhD level on GPQA Diamond. o4-mini is the cost-efficient reasoning option at $1.10/M input.</li>
        <li><strong>Claude Opus 4.7 and Sonnet 4.6</strong> — Anthropic's extended thinking mode lets Claude spend tokens on visible reasoning steps. Particularly useful for agentic tasks where intermediate steps matter.</li>
        <li><strong>Gemini 2.5 Pro and Flash</strong> — Google's thinking mode is configurable (budget tokens). Pro is the strongest on long-context reasoning tasks; Flash is cheaper with comparable thinking capability.</li>
        <li><strong>DeepSeek R1</strong> — Open-weights reasoning model that competes with o1 on AIME and MATH at a fraction of the cost. Weights are publicly available for self-hosting.</li>
        <li><strong>Grok 3 mini</strong> — xAI's efficient reasoning model with thinking mode, priced very competitively at $0.30/M input, $0.50/M output.</li>
      </ul>
      <p>
        The trade-off: reasoning models are slower (latency can be 10–30s for hard problems) and charge per thinking token
        generated, which can significantly inflate cost. Always measure on your real task before committing to a reasoning
        model — for simpler tasks, a mid-tier non-reasoning model often performs just as well at 5–20× lower cost.
      </p>

      <h2>Open-weights models: self-host or use an API?</h2>
      <p>
        Four providers in this table have released weights publicly: Meta (Llama 4 Scout and Maverick), Mistral (Mistral Small),
        and DeepSeek (DeepSeek R1). This means anyone can download the weights and run the model on their own infrastructure
        — a GPU cluster, a cloud VM, or a local workstation for smaller models.
      </p>
      <p>
        <strong>Advantages of self-hosting:</strong> zero per-token cost at scale, complete data privacy (no third-party
        sees your prompts), no rate limits, ability to fine-tune on proprietary data, and no vendor lock-in.
        <strong>Trade-offs:</strong> infrastructure cost (A100/H100 GPUs or equivalent), engineering overhead to deploy
        and scale, and responsibility for security, updates, and monitoring.
      </p>
      <p>
        If self-hosting is not practical, all major open-weights models are available via third-party API providers
        — Groq (fastest inference), Fireworks, Together AI, AWS Bedrock, and Azure AI. Prices shown in this tool
        are indicative of typical third-party API rates.
      </p>

      <h2>Context windows: when they matter</h2>
      <p>
        Context window is the maximum combined length of your input plus the model's output, measured in tokens.
        Most models in this table support 128K–200K tokens — roughly 90,000–140,000 words, or a short novel.
        This is sufficient for the vast majority of tasks. Where it breaks down:
      </p>
      <ul>
        <li><strong>Long conversations</strong> — chat history accumulates fast. At 128K tokens, a busy 8-hour customer service session can overflow.</li>
        <li><strong>Large codebases</strong> — feeding an entire repository as context requires 200K+ tokens for mid-sized projects.</li>
        <li><strong>Legal and scientific documents</strong> — contracts, research papers, or clinical trial filings can exceed 100K tokens each.</li>
        <li><strong>Multi-document RAG</strong> — if you retrieve 20 documents of 5K tokens each, plus a long system prompt, you can exceed 128K quickly.</li>
      </ul>
      <p>
        For these workloads, <strong>Gemini 2.5 Pro (2M tokens)</strong> and <strong>Llama 4 Scout (10M tokens)</strong>
        are in a different league. Gemini 2.5 Pro is the strongest large-context commercial option; Llama 4 Scout provides
        open-weights access at a massive context depth. Note that larger context also typically increases latency and cost.
      </p>

      <h2>Vision and multimodal capabilities</h2>
      <p>
        All frontier models and most mid-tier models now accept images alongside text. Vision-capable models can analyze
        charts and graphs, understand document layout, debug UI screenshots, classify product images, and answer questions
        about visual content. Models without vision in this table as of April 2026 are DeepSeek V3, DeepSeek R1 (API),
        Mistral Large, Mistral Small, and Grok 3 mini.
      </p>
      <p>
        Vision is billed separately from text tokens. OpenAI charges per image tile based on resolution; Anthropic charges
        a flat per-image rate plus additional tokens for the image content; Google Gemini charges tokens at the same rate
        as text. For workloads with many images, these costs can add up significantly — benchmark your specific use case
        rather than relying on text-only estimates.
      </p>

      <h2>Capabilities: tool use, JSON mode, batch API, fine-tuning</h2>
      <ul>
        <li>
          <strong>Tool use (function calling)</strong> — the model can call structured functions you define, parse structured
          arguments, and act on the result. This is the foundation of agent and RAG architectures. Nearly all models in
          this table support it.
        </li>
        <li>
          <strong>JSON mode / structured output</strong> — forces the model to emit syntactically valid JSON matching a
          schema you specify. Essential for reliable programmatic parsing. All models shown here support this either via
          a dedicated mode or via prompt engineering.
        </li>
        <li>
          <strong>Batch API</strong> — submit jobs for asynchronous processing (up to 24 hours) at 50% off standard
          pricing. Available from OpenAI, Anthropic, and Google. Not yet available from xAI, DeepSeek, Meta, or Mistral
          as of April 2026. Ideal for large offline workloads where latency is not a constraint.
        </li>
        <li>
          <strong>Fine-tuning</strong> — adapt the base model to your domain using labeled examples. OpenAI offers
          fine-tuning on GPT-4o and GPT-4o mini; Meta's Llama 4 series can be fine-tuned since weights are available.
          Fine-tuning typically improves consistency on narrow tasks but does not reliably improve general reasoning —
          consider it a polish step after prompt engineering is mature.
        </li>
      </ul>

      <h2>How to choose: a practical framework</h2>
      <p>
        Rather than picking the "best" model, match the model to the task:
      </p>
      <ul>
        <li><strong>Hard reasoning, math, competitive code, research</strong> → o3, Claude Opus 4.7, Gemini 2.5 Pro, DeepSeek R1</li>
        <li><strong>General-purpose coding assistant</strong> → Claude Sonnet 4.6, GPT-4o, Gemini 2.5 Flash</li>
        <li><strong>High-volume classification or extraction</strong> → GPT-4o mini, Gemini 2.0 Flash, Claude Haiku 4.5, Llama 4 Scout</li>
        <li><strong>Long document analysis (200K+ tokens)</strong> → Gemini 2.5 Pro (2M), Llama 4 Scout (10M)</li>
        <li><strong>Data privacy / self-hosted inference</strong> → Llama 4 Maverick, Llama 4 Scout, Mistral Small, DeepSeek R1</li>
        <li><strong>Budget-constrained reasoning</strong> → DeepSeek R1, o4-mini, Grok 3 mini, Gemini 2.5 Flash</li>
        <li><strong>Multimodal (image + text)</strong> → GPT-5, GPT-4o, Claude Opus/Sonnet, Gemini 2.5 Pro/Flash, Llama 4</li>
        <li><strong>European data sovereignty</strong> → Mistral Large (France-based, GDPR-native)</li>
      </ul>
      <p>
        A pragmatic approach: start with a mid-tier model (Claude Sonnet 4.6 or GPT-4o), measure quality on your
        real task using a representative eval set, then decide whether upgrading to frontier is worth the cost or
        downgrading to fast-tier still passes your quality bar. The right model is the cheapest one that meets
        your quality threshold — not necessarily the most capable one.
      </p>

      <h2>Related tools</h2>
      <p>
        Use the <a href="/tools/ai-cost-calculator">AI API Cost Calculator</a> to estimate per-call and monthly
        spend for any model in this table — enter your token counts, call volume, and pricing mode (Standard /
        Prompt cache / Batch). Use the <a href="/tools/token-counter">AI Token Counter</a> to measure exactly
        how many tokens your prompts consume across GPT, Claude, and Gemini tokenizers.
      </p>
    </div>
  );
}
