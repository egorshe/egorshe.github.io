---
layout: post
tags: [references, scholar, obsidian]
title: obsidian citations plugin
draft: true
has_carousel: true 
---

Single page: {% cite nicholsIntroductionDocumentary2010 -l 20 %}

{% include carousel.html 
   uid="gallery1"
   path="assets/img/2025-12-01-citations-plugins-test" 
   images="air-1.webp,air-2.webp,air-3.webp,air-4.webp,air-5.webp,air-6.webp" 
%}
Apple in the river  

With label: {% cite nicholsIntroductionDocumentary2010 -L page -l 20 %}



Range: {% cite nicholsIntroductionDocumentary2010 -l 14-15 %}

References
{% bibliography --cited %}
