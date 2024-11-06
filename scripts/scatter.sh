#!/bin/bash

dir1="./cats/Лєля"

ls $dir1

dirs=($dir1)

start_date="$(date -v-32H +%s)"
end_date="$(date +%s)"

distribute_timestamps() {
  local directory=$1
  for file in "$directory"/*; do
    if [[ -f "$file" ]]; then
      random_timestamp=$((start_date + RANDOM % (end_date - start_date) * 4))
      touch -t $(date -r $random_timestamp "+%Y%m%d%H%M") "$file"
    fi
  done
}

for dir in "${dirs[@]}"; do
  if [[ -d "$dir" ]]; then
    distribute_timestamps "$dir"
  else
    echo "Directory $dir does not exist. Skipping."
  fi
done

echo "Timestamps have been scattered randomly within the past month."
