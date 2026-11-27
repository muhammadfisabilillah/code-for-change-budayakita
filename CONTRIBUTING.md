# Contributing

Thank you for helping make cultural heritage accessible to everyone. Contributions are welcome — from bug fixes and content to accessibility improvements and new features.

## Workflow

1. **Fork** this repository and clone your fork locally.
2. **Create a branch** from `main` with a descriptive name:

   ```bash
   git checkout -b feat/your-feature-name
   ```

3. **Make your changes** and keep commits focused. Use conventional commit messages, for example:

   ```bash
   git commit -m "feat: add transcript toggle to culture detail"
   ```

4. **Verify your work** before opening a pull request:

   ```bash
   npm run lint
   npm run typecheck
   npm run build
   ```

5. **Push** your branch and open a pull request against `main`. Describe what changed and why, and include screenshots for visual changes.

## Non-negotiable Requirements

- **Accessibility (WCAG 2.1 AA)** — Every contribution must preserve or improve:
  - Keyboard operability and visible focus indicators
  - Meaningful alt text and transcripts for media
  - Sufficient color contrast in light, dark, and high contrast modes
  - Respect for `prefers-reduced-motion`
  - Semantic HTML and correct heading order

  A change that introduces an accessibility regression will not be merged.

- **TypeScript** — All new code must be typed. Avoid `any`; prefer explicit interfaces/types. `npm run typecheck` must pass with no errors.

- **Design consistency** — Follow the Architectural Editorial system: stone palette, one restrained accent, generous spacing, light typography, thin borders, no heavy shadows, and no pure yellow in any theme.

- **Documentation** — Update `README.md` when adding setup steps, scripts, or environment variables.

## Reporting Issues

Open an issue describing the expected behavior, actual behavior, steps to reproduce, and the device/browser or assistive technology used. Accessibility barriers are treated as high priority.

By contributing, you agree that your work is licensed under the MIT License.
