---
title: "Legacy Node Type in EDM — mapping an old EBS Chart of Accounts to Oracle Cloud ERP without blowing up the license"
date: "2026-06-23"
excerpt: "A client was finally moving off EBS onto Oracle Cloud ERP and needed the entire legacy Chart of Accounts mapped to the new Fusion COA. Here's how the Legacy GL node type kept that mapping exercise from inflating the EDM subscription."
---

# Legacy Node Type in EDM — mapping an old EBS Chart of Accounts to Oracle Cloud ERP without blowing up the license

I want to walk through a specific situation instead of talking about this feature in the abstract, because that's how it actually clicked for me too.

A client of mine had been running EBS for close to fifteen years and was finally making the move to Oracle Cloud ERP. Classic story — the EBS Chart of Accounts had grown organically over a decade and a half, segments got repurposed for things they were never designed for, there were account combinations nobody could explain anymore, and naturally the project team decided this was the moment to do a proper COA redesign instead of just lifting and shifting the mess into the new system.

That meant capturing the entire legacy EBS COA, building the new Fusion Cloud COA structure, and mapping every single legacy combination to where it belonged in the new world. Get that wrong and you've got broken reporting and reconciliation headaches for years after go-live. Get it right and the new COA actually works the way finance wants it to from day one.

That's a COA mapping problem, and EDM is the right tool for it. But it's also exactly the kind of scenario where, if you're not careful, you end up paying for a pile of data you only need for the length of the project.

## Why this is harder than it sounds

The EBS COA on this engagement had a few thousand account combinations once you accounted for all the segments — company, cost center, account, and a couple of custom segments that had been bolted on over the years for one-off reporting needs. None of that legacy structure mattered to the business going forward. It existed purely so we could trace every legacy combination to its new home in the redesigned Fusion COA and prove nothing got lost in the conversion.

The instinct is to just load the entire legacy EBS structure straight into EDM and start mapping. Which works fine functionally, right up until someone on the program finance team notices the EDM subscription's node count jumped and asks why they're paying to license thousands of accounts that are getting retired the day after cutover.

## What I did instead

I set up a Legacy GL node type and loaded the EBS COA into it exactly as it existed in the source system — same segment values, same combinations, same naming quirks, no cleanup. The point wasn't to make it pretty. The point was to have an accurate, queryable copy of the legacy structure sitting in EDM, available for mapping and validation, without it costing anything against the subscription.

Here's what that actually looks like in EDM. I named it `GlMappingLegacy`, set the Node Type Class to **Legacy GL**, and gave it a description that's blunt about what it's for — "Merger Temp. Node Type." (Reused the naming convention from an earlier project, the description doesn't need to be precious, it just needs to be obvious to the next person who opens it.)

![GlMappingLegacy node type configuration showing Node Type Class set to Legacy GL](/images/edm-legacy-node/glmapping-node-type.png)

That one field — Node Type Class set to Legacy GL instead of Normal — is the entire trick. Everything else about setting it up is identical to creating a regular node type.

The new Fusion Cloud COA stayed a Normal node type, the way any production hierarchy should — that one's permanent, gets real governance applied to it, and rightly counts against the license.

Then it was a straightforward mapping exercise. For every account combination in the legacy EBS node set, we mapped it to where it landed in the new Fusion COA. Some were obvious — straightforward expense and revenue accounts mapped one-to-one without much debate. Others took real conversations with the finance team, because EBS had account combinations that existed for historical reasons that didn't map cleanly to the new, simplified segment structure, and we had to decide whether those got consolidated into a broader account or retired outright with a documented rationale.

Where this earned its keep was validation. Before final cutover, we ran a query against the Legacy GL node set for anything still unmapped. Found a handful of account combinations nobody had gotten to — most were dormant with no activity in years, fine to retire, but two of them had real balances sitting against them that would have had nowhere to land post-conversion if we'd missed them. That's exactly the kind of gap that turns into a reconciliation nightmare during the first close on the new system if it slips through.

Once cutover happened and the first close on Oracle Cloud ERP reconciled cleanly against the legacy EBS data, we retired the Legacy GL node set. Didn't need it anymore — the mapping was complete, the conversion was documented, and because none of those legacy accounts ever counted against the subscription, walking away from them cost nothing either.

## Why this matters beyond the one project

Every EBS-to-Cloud migration I've been part of hits this same shape: a legacy COA that's existed for years, a redesigned COA the business actually wants, and a mapping exercise that needs a full, accurate copy of the old structure to validate against. Without the Legacy GL node type, that mapping exercise quietly inflates your EDM footprint with account data that has no reason to exist past go-live.

With it, the legacy COA capture becomes something you can do thoroughly — load everything, map everything, validate everything — without the licensing conversation turning into a reason to scope down how much of the legacy structure actually gets captured.

## When this isn't the right call

This only works because the legacy EBS structure was genuinely temporary — it existed to get mapped, validated, and then retired. If part of that legacy environment is going to keep running in parallel for an extended period, or if you need to track it with custom properties beyond what Legacy GL allows, that's not a Legacy GL situation anymore — that's a second Normal node type you're going to govern for real. Know which one you're actually dealing with before you set it up, because switching later isn't free.

## Bottom line

The Legacy GL node type isn't really about COA redesign in the abstract — it's about any scenario where you need to bring in a large set of accounts you only need temporarily for mapping and validation. An EBS-to-Cloud ERP migration is one of the cleanest examples of that I've run into, and it's the project that made this feature click for me.

— Ashok
