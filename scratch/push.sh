#!/bin/bash
echo "Staging Header.jsx..."
git add src/components/Header.jsx
echo "Committing..."
git commit -m "design: Reduce logo size in header"
echo "Pushing..."
git push
echo "Done!"
