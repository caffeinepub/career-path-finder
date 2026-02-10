# Specification

## Summary
**Goal:** Expand the Career Survey with additional interest-analysis steps and use the richer answers to generate broader, more diverse career recommendations.

**Planned changes:**
- Add at least one new survey step focused on deeper interest analysis (beyond the existing “Areas of Interest” checklist), increasing the total step count beyond the current five.
- Update the survey progress indicator to reflect the new total steps and navigation accurately.
- Implement per-step validation so users cannot proceed until required inputs for each new step are provided.
- Extend the frontend survey answer model/state to store new interest-analysis answers and ensure survey completion still calls the existing `onComplete` callback with all answers.
- Update recommendation input/scoring (frontend + backend) to incorporate the new interest-analysis answers and support returning/rendering more than two recommendation cards when appropriate.
- Update backend rule-based recommendation logic to use the expanded interest-analysis data while continuing to return required recommendation fields (title, description, required skills, typical education, and match rationale).

**User-visible outcome:** Users complete an expanded survey with deeper interest questions and then see a broader set of career recommendations that better reflects their nuanced interests.
