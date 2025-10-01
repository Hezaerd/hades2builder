# Contributing to Hades 2 Build Planner

Thank you for your interest in contributing to the Hades 2 Build Planner! This document provides guidelines and information for contributors.

## 🤝 How to Contribute

### Reporting Issues

Before creating an issue, please:
1. Check if the issue already exists
2. Use the issue templates when available
3. Provide clear steps to reproduce the problem
4. Include relevant system information

### Suggesting Features

We welcome feature suggestions! Please:
1. Check existing feature requests first
2. Describe the feature clearly
3. Explain why it would be useful
4. Consider implementation complexity

### Code Contributions

1. **Fork the repository**
2. **Create a feature branch** from `master`
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. **Make your changes** following our coding standards
4. **Test your changes** thoroughly
5. **Commit with clear messages**
6. **Push to your fork**
7. **Create a Pull Request**

## 🛠️ Development Setup

### Prerequisites

- [Bun](https://bun.sh) (recommended) or Node.js 18+
- PostgreSQL database
- Git

### Local Development

1. **Fork and clone the repository**
   ```bash
   git clone https://github.com/yourusername/hades2builder.git
   cd hades2builder
   ```

2. **Install dependencies**
   ```bash
   bun install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   Configure your local database and other settings.

4. **Set up the database**
   ```bash
   bun run db:migrate
   bun run db:generate
   ```

5. **Start the development server**
   ```bash
   bun run dev
   ```

## 📋 Coding Standards

### TypeScript
- Use TypeScript for all new code
- Follow existing type patterns
- Avoid `any` types when possible
- Use proper type definitions

### React Components
- Use functional components with hooks
- Follow the existing component structure
- Use proper prop types
- Keep components focused and reusable

### Styling
- Use Tailwind CSS classes
- Follow the existing design system
- Use CSS variables for theming
- Ensure responsive design

### Code Style
- Use Biome for formatting and linting
- Follow existing naming conventions
- Write clear, self-documenting code
- Add comments for complex logic

### File Organization
- Place components in appropriate directories
- Use index files for clean imports
- Follow the existing folder structure
- Keep related files together

## 📝 Commit Guidelines

### Commit Message Format
```
type(scope): description

[optional body]

[optional footer]
```

### Types
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

### Examples
```
feat(builds): add weapon selection component
fix(auth): resolve login redirect issue
docs(readme): update installation instructions
```

## 🔄 Pull Request Process

### Before Submitting
1. **Test your changes** thoroughly
2. **Run linting and formatting**
   ```bash
   bun run lint
   bun run format
   ```
3. **Update documentation** if needed

### PR Description
Include:
- Clear description of changes
- Reference to related issues
- Screenshots for UI changes
- Breaking changes (if any)

### Review Process
1. Code review by maintainers
2. Address feedback promptly
3. Keep PRs focused and small
4. Update documentation as needed

## 🐛 Bug Reports

When reporting bugs, please include:

1. **Clear title** describing the issue
2. **Steps to reproduce** the problem
3. **Expected behavior** vs actual behavior
4. **Screenshots** if applicable
5. **System information**:
   - Browser and version
   - Operating system
   - Device type (desktop/mobile)

## 💡 Feature Requests

When suggesting features:

1. **Check existing requests** first
2. **Describe the problem** you're trying to solve
3. **Propose a solution** with details
4. **Consider alternatives** you've thought of
5. **Explain the benefits** for users

## 🏷️ Labels

We use labels to categorize issues and PRs:

- `bug`: Something isn't working
- `enhancement`: New feature or request
- `documentation`: Improvements to documentation
- `good first issue`: Good for newcomers
- `help wanted`: Extra attention is needed
- `priority: high`: High priority items
- `priority: low`: Low priority items

## 📞 Getting Help

- **Discord**: [Join our community](https://discord.gg/CG6CJRkcdm)
- **GitHub Discussions**: For questions and ideas
- **Issues**: For bug reports and feature requests

## 📜 Code of Conduct

### Our Pledge
We are committed to providing a welcoming and inclusive environment for all contributors.

### Expected Behavior
- Be respectful and inclusive
- Focus on what's best for the community
- Show empathy towards others
- Accept constructive criticism gracefully

### Unacceptable Behavior
- Harassment or discrimination
- Trolling or inflammatory comments
- Personal attacks or political discussions
- Spam or off-topic discussions

## 📄 License

By contributing, you agree that your contributions will be licensed under the same license as the project (GNU Affero General Public License v3.0).

Thank you for contributing to the Hades 2 Build Planner! 🔥⚔️
