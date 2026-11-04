#!/bin/bash
# Screenshot helper: ./shot.sh <path> <width,height> <out.png>  (serves the current build on :3218)
cd "$(dirname "$0")"
npx next start -p 3218 >/dev/null 2>&1 &
for i in $(seq 1 30); do curl -sf http://localhost:3218/ >/dev/null && break; sleep 1; done
google-chrome --headless=new --hide-scrollbars --window-size=$2 --virtual-time-budget=4000 --screenshot="$3" "http://localhost:3218$1" 2>/dev/null
fuser -k 3218/tcp >/dev/null 2>&1
