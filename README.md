# Personal Website v3

This repository contains the source code for my personal website. It’s built as a modern **single-page application (SPA)** with a strong focus on performance, maintainability, and developer experience.

The site supports **both mobile and desktop browsers** through separate build paths, allowing layouts and assets to be optimized per platform while sharing the same core codebase.

---

## ✨ Tech Stack

* **Framework:** Vue 3
* **Language:** TypeScript
* **Styling:** HTML, CSS
* **Bundler:** Vite
* **Linting & Formatting:**
  * ESLint
  * Stylelint
  * Prettier
* **Commit & Git Hooks:**
  * Husky
  * Commitlint
  * lint-staged

This setup enforces consistent code style, clean commits, and high-quality standards across the entire project.

---

## 🧠 Architecture Overview

* **Single Page Application (SPA)**
* Modular, component-driven design
* Shared core logic with **platform-specific build outputs**
* Fast local development and optimized production builds via Vite

---

## 📱 Platform Support

The website is built to support multiple targets:

* **Desktop**
* **Mobile**

---

## 🚀 Getting Started

### Install dependencies

```bash
npm install
```

### Run development server

```bash
npm run dev
```

### Build for production

```bash
npm run build
```

---

## 🧹 Code Quality & Tooling

This repo uses automated tooling to keep the codebase clean and consistent:

* **ESLint** for JavaScript/TypeScript and Vue rules
* **Stylelint** for CSS
* **Prettier** for formatting
* **Commitlint** to enforce conventional commits
* **Husky + lint-staged** to run checks before commits

All checks run automatically during development and before code is committed.

---

## 📁 Project Goals

* Maintain a clean, scalable frontend architecture
* Optimize UX for both mobile and desktop
* Treat frontend development as a long-term craft
* Keep tooling modern, fast, and low-friction

---

## 📄 License

This project is for personal use and experimentation. All rights reserved unless otherwise stated.
