---
title: "Legacy Node Type in EDM — how I onboarded an acquired company's COA without blowing up the EDM license"
date: "2026-06-23"
excerpt: "A client acquired a smaller competitor and needed that company's entire Chart of Accounts mapped into the parent COA fast. Here's how the Legacy GL node type made that onboarding painless instead of a licensing headache."
---

# Legacy Node Type in EDM — how I onboarded an acquired company's COA without blowing up the EDM license

I want to walk through a specific situation instead of talking about this feature in the abstract, because that's how it actually clicked for me too.

A manufacturing client I worked with acquired a smaller regional competitor. Not a huge deal in dollar terms, but messy in the way these things always are — the acquired company ran its own ERP, had its own Chart of Accounts, its own naming conventions, its own "why does this GL code exist" history that nobody on either side could fully explain anymore. Corporate wanted the acquired entity's financials rolled into group reporting within the quarter. Finance wanted it done right, not just shoved into the consolidation with a bunch of manual adjusting entries every month forever.

That's a COA mapping problem, and EDM is the right tool for it. But it's also exactly the kind of scenario where, if you're not careful, you end up paying for a pile of data you only need for a few months.

## Why this is harder than a normal mapping exercise

Onboarding an acquired company's COA isn't like a typical redesign where you're mapping your own messy chart to your own cleaner one. You're mapping somebody else's chart — built under completely different assumptions, by people who don't work for you, sometimes in a different ERP entirely — into your existing structure. The acquired company had maybe 1,800 active accounts across all their entities and cost centers. None of those accounts mattered to corporate finance one bit, except for the ninety days or so it would take to map every single one of them into the parent COA and make sure nothing fell through.

The instinct is to just load all 1,800 accounts straight into EDM and start mapping. Which works fine, until someone in IT procurement notices the EDM subscription's node count just jumped and asks why you're paying to license accounts that exist purely to be retired after onboarding.

## What I did instead

I set up a Legacy GL node type and loaded the acquired company's entire COA into it exactly as it came out of their ERP — same account numbers, same cost center codes, same weird legacy naming, no cleanup. The point wasn't to make it pretty. The point was to have an accurate, queryable copy of what they actually had, sitting in EDM, costing us nothing against the subscription.

Here's what that actually looks like in EDM. I named it `GlMappingLegacy`, set the Node Type Class to **Legacy GL**, and gave it a description that's blunt about what it's for — "Merger Temp. Node Type." No mystery to come back to six months later wondering why this thing exists.

![GlMappingLegacy node type configuration showing Node Type Class set to Legacy GL](/images/edm-legacy-node/glmapping-node-type.png)

That one field — Node Type Class set to Legacy GL instead of Normal — is the entire trick. Everything else about setting it up is identical to creating a regular node type.

The parent company's Chart of Accounts stayed a Normal node type, the way it always had been — that one's permanent and gets real governance, so it should count against the license, that's appropriate.

Then it was a straightforward mapping exercise. For every account in the acquired company's Legacy GL node set, we mapped it to where it landed in the parent COA. Some mappings were obvious — their "Office Supplies Expense" mapped cleanly to ours. Others took actual conversations with their controller, because their account for, say, "Equipment Rental — Field Ops" didn't have a clean parent-company equivalent and we had to decide whether it became its own account or got rolled into something broader.

Where this earned its keep was validation. Before the first consolidated close with the acquired entity included, we ran a query against the Legacy GL node set for anything still unmapped. Found four accounts nobody had gotten to — three of them were dormant accounts with zero activity in two years, totally fine to skip, but one of them had a small but real balance sitting on it that would have landed nowhere in the consolidation if we'd missed it. That's the kind of thing that turns into an embarrassing audit finding eight months later if it slips through.

Once that first consolidated close went clean and the controller signed off, we retired the Legacy GL node set. Didn't need it anymore — the mapping was done, the relationship was documented, and because none of those 1,800 accounts ever counted against the subscription, walking away from them cost nothing either.

## Why this matters beyond the one project

If your company does any amount of M&A — and a lot of mid-size and larger organizations do this more often than people assume — this pattern repeats every single time you acquire something. New entity, new COA, new mapping exercise, new pile of accounts you only need temporarily. Without the Legacy GL node type, every acquisition quietly inflates your EDM footprint with data that has no business sticking around past the integration period.

With it, onboarding a new company's COA becomes something you can do confidently and repeatedly, without finance asking "wait, why is our EDM bill creeping up every time we buy a company."

## When this isn't the right call

This only works because the acquired company's COA was genuinely temporary — it existed to get mapped and then go away. If you're in a situation where the acquired entity is going to keep operating semi-independently with its own evolving chart for years, that's not a Legacy GL situation anymore, that's just a second Normal node type you're going to govern long term. Know which one you're actually dealing with before you set it up, because switching later isn't free.

## Bottom line

The Legacy GL node type isn't really about COA redesign in the abstract — it's about any scenario where you need to bring in a large set of accounts you only need temporarily for mapping and validation. M&A onboarding is one of the cleanest examples of that I've run into, and it's the project that made this feature click for me.

— Ashok
