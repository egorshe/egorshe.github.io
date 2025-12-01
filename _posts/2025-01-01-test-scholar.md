---
layout: post
tags: [references, scholar]
title: JEKYLL scholar test post
draft: true
---

This is a comprehensive test post to demonstrate how jekyll-scholar handles various citation scenarios, including inline citations, page numbers, multiple works, and different formatting situations.
Introduction
Academic writing requires precise citation practices. This post demonstrates various ways to cite sources using jekyll-scholar, from simple references to complex multi-author citations with specific page numbers.
1. Basic Single Citation
Here is a simple inline citation to a monograph: {% cite abashinBratskieNarodySistemy %}.
When discussing historical narratives, we must consider the role of collective memory {% cite abdelalMemoriesNationsStates2002 %}.
2. Citations with Page Numbers
Adorno argues that "aesthetic judgment operates through a dialectical tension" {% cite adornoAestheticTheory1997 --page 45 %}.
The concept of imagined communities remains central to understanding nationalism {% cite alisauskasImaginingLithuania1002018 --locator 112-115 %}.
3. Citations with Multiple Page References
According to recent scholarship on cultural trauma {% cite alexanderCulturalTraumaCollective2004 --locator 1-30 %}, collective memory shapes national identity in profound ways.
4. Multiple Citations in One Place
Several scholars have examined the intersection of memory and national identity from different theoretical perspectives {% cite abdelalMemoriesNationsStates2002 abdelalMemoriesNationsStates2002a andrewWhatCinemaBazins2010 %}.
5. Narrative-Style Citations with Pages
As {% cite adornoAestheticTheory1997 --page 67 %} demonstrates, the relationship between form and content in art cannot be separated from social conditions.
According to {% cite andallNationalBelongingsHybridity2010 --locator 23 %}, national belonging is increasingly understood as a hybrid construction rather than a fixed identity.
6. Repeated Citations (Same Work, Different Pages)
First mention of a key text: {% cite alisauskasImaginingLithuania1002018 --page 10 %}.
Later reference to the same work: {% cite alisauskasImaginingLithuania1002018 --page 145 %}.
Final reference to demonstrate consistency: {% cite alisauskasImaginingLithuania1002018 --locator 200-205 %}.
7. Complex Citation Keys
Some bibliographic entries have complex keys with special characters. For example: {% cite alenbadyu;sostav.iper.sfr.v.e.lapickogo.ManifestFilosofii2003 %}.
8. Mixed Citation Patterns in Paragraph
The visual turn in cultural studies {% cite amadVisualRiposteLooking %} has opened new avenues for analyzing media representations. This approach complements earlier work on media archaeology and the construction of historical narratives {% cite adaskinaEtoByloNavsegda2020 --page 78 %}. Together, these frameworks help us understand how Baltic cinema negotiates between local traditions and global influences.
9. Chapter or Article in Edited Volume
When examining hybrid identities in post-Soviet contexts, scholars have noted the complexity of belonging {% cite andallNationalBelongingsHybridity2010 --locator 45-52 %}.
10. Multiple Works by Same Author
Abdel-Nour's work on memory and nations {% cite abdelalMemoriesNationsStates2002 %} builds upon his earlier research {% cite abdelalMemoriesNationsStates2002a %}, showing an evolution in his theoretical approach.
11. Parenthetical Style (if needed)
Some disciplines prefer parenthetical citations. In jekyll-scholar, you can achieve this by using the cite tag within parentheses: ({% cite alexanderCulturalTraumaCollective2004 --page 15 %}).
12. Quotation with Page-Specific Citation
Bazin famously argued that cinema's ontology is rooted in photography's indexical relationship to reality {% cite andrewWhatCinemaBazins2010 --locator 9-16 %}. This understanding of cinema's essence continues to influence film theory today.
Conclusion
This test post demonstrates the versatility of jekyll-scholar for academic writing. The plugin handles various citation scenarios effectively, from simple references to complex multi-source citations with specific page locators.

References
{% bibliography --cited %}
