---
updated: 2026-11-08
---

# A Real-World Story: Helping Someone Who Kept Forgetting Passwords with a Single PWA

Someone who regularly joined my gaming streams told me about a problem at work: passwords had to be changed every three months, and forgetting one could mean writing an incident report. It sounded like a small inconvenience until I considered how often the same problem could happen.

I wanted to build something that would help without creating yet another account or storing a list of sensitive passwords. That became the idea behind **OJ-Pass**.

## 1. Why conventional password management wasn't the answer I wanted

A typical password manager stores encrypted credentials and unlocks them with a master password or device authentication. That is a valid approach, but it was not the experience I wanted for this particular experiment.

Instead, I explored a deterministic approach: generate the same result again from the same inputs, rather than saving the resulting password in the browser.

## 2. Rebuilding a password from three stable inputs

The basic concept uses three values that the user can reproduce consistently. Feed the same values into the same algorithm, and the output will be the same. Change an input, and the result changes.

The important point is that **repeatability does not automatically mean security**. If the inputs are easy to guess or the derivation method is weak, an attacker may be able to reproduce the password too. A practical password derivation system needs a carefully designed secret, a suitable key-derivation function, and protection against guessing.

## 3. The technical idea: SHA-256 and deterministic output

SHA-256 produces a fixed-length digest for a given input. It is deterministic: identical inputs produce identical digests. A prototype can transform that digest into a password-like string and adjust its characters to satisfy a site's requirements, such as including symbols.

However, plain SHA-256 by itself is **not** a password-strengthening key derivation function. A production-grade system should use a purpose-built approach such as PBKDF2, scrypt, or Argon2, with appropriate parameters and domain separation. Password requirements also differ between services, so the output rules need to be explicit.

## 4. Why I made it a PWA

A single web page can provide a small utility without an app-store release. Adding it to the home screen gives the user a familiar icon and a direct way back to the tool.

This experiment started with one person's very ordinary frustration. It reminded me that useful software does not have to be large. Sometimes a focused page that solves one problem is enough.
