#Problem Statement
Create a virtualized table component that efficiently renders large datasets (1000+ rows, 50+
columns) by implementing virtual scrolling (vertical and horizontal) to optimize performance.
Additionally, the table must freeze the first 2 and last 2 columns, so they always remain visible
while scrolling horizontally.

#Requirements
1. Display a scrollable table with:
○ At least 1000 rows and 50 columns.
○ Smooth vertical and horizontal scrolling (virtualized rendering).
2. Freeze the first 2 and last 2 columns so they remain visible during horizontal scrolling.
3. Implement row height and column width virtualization to only render what's visible in the
viewport.
4. Handle window resize gracefully.
