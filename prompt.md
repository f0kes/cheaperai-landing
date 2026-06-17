1. cheaperAI: we offer making voice/text chatbots, llm workflows cheaper by replacing claude/chatgpt API with cheaper, smaller open source models, keeping the quality on par using prompt engineering and better catch-all parsers.  we choose the correct model for each tasks based on quantative metrics, and help you count tokens never exceeding your limits
2. this project is a svelte landing page:
big company name, scroll
then there goes typical "3 plans" like module 1. chatgpt/claude  2.glm 5.2/deepseek pro  3. deepseek flash. one is selected as recommended
on the same screen we have a calculator: total users, dropdown list of tasks that the bot performs, are tools executed, how often and how long the chat with a user is. depending on calculator choose the "plan"  and on that plan with large letters how much they will save per month compared to chatgpt
then describe your product textbox and send
then still have questions? write us and a contact

1. Overall Aesthetic: "Modern Developer SaaS"
Think of the design language used by companies like Vercel, Supabase, or Linear. It should feel lightweight, blazing fast (which fits perfectly with your Svelte stack), and highly analytical.

Theme: Dark Mode. It immediately signals "developer tool" and reduces eye strain. Use deep charcoal or slightly blue-tinted blacks (e.g., #0A0A0A or #111827), not pure black.

Accent Color: Emerald/Neon Green. Green universally signals "savings," "go," and "efficiency." Use this sparingly but aggressively for the "Recommended Plan" border and the final "Money Saved" number.

Typography: * Body/Headings: A clean, geometric sans-serif like Inter or Geist.

Data/Numbers: A monospace font like JetBrains Mono or Fira Code for the calculator numbers, token counts, and pricing. This adds a subtle, nerdy, "we count every token" vibe.

2. Section-by-Section UX/UI Breakdown
Hero Section (The Hook)

Visuals: Keep it minimalist. A massive, bold headline (e.g., "Cut Your LLM Bill by 80%. Keep the Quality.").

Animation: A subtle Svelte transition. Perhaps a typing effect that replaces "ChatGPT API" with "DeepSeek Pro" while a price counter drops.

Scroll Prompt: A simple, bouncing chevron pointing down to the calculator.

The Core: Calculator + Plans (Side-by-Side Layout)
This is the most important screen on your site. On desktop, this should be a two-column layout so the user can see the inputs change the outputs in real-time.

Left Column (The Calculator):

Instead of boring drop-downs, use interactive UI elements.

Total Users / Chat Length: Use sleek sliders with monospace numbers updating in real-time above the thumb.

Tools Executed: A simple, modern toggle switch.

Tasks: Sleek pill-shaped buttons they can click to select/deselect (e.g., [Data Extraction], [Creative Writing], [Customer Support]).

Right Column (The 3 Plans):

Display the three plans as cards.

The Magic: Because you are using Svelte, make this highly reactive. As they move the sliders on the left, the cards on the right should visually shuffle or update.

The "Recommended" card based on their input should elevate (add a drop shadow) and get an Emerald Green border. The other two should dim slightly.

The Big Reveal: Inside the recommended card, display the monthly savings in massive, bold monospace text (e.g., "You save $4,250/mo vs ChatGPT"). Make this number count up quickly (an odometer effect) when the inputs change.

Lead Gen: Describe Your Product

Visuals: A wide, clean textarea that looks like a terminal or code editor input. Give it a subtle glowing border on focus.

Copy: Keep it actionable. "Let us analyze your use case."

Button: A solid accent-color button: [ Get Your Free Optimization Report ] or simply [ Send ].

Footer: Contact & Trust

Keep it simple. "Still have questions? We're engineers, not salespeople. Let's talk."

Provide a plain text email link (e.g., founders@cheaperAI.com) and links to your GitHub/Twitter if you have them.

3. Key Design Principles to Keep in Mind
Show, Don't Tell: The real-time calculator is your product pitch. The smoother and more reactive it feels, the more they will trust your tech stack.

No Fluff: Avoid generic corporate illustrations (like people high-fiving around a computer). If you use graphics, use abstract data visualizations, nodes, or token graphs.


