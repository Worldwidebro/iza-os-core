#!/usr/bin/env python3
'''
Deduplication Script
Removes duplicate files and consolidates shared code
'''

import os
import hashlib
from pathlib import Path
from collections import defaultdict

def find_duplicates(directory):
    '''Find duplicate files by content hash'''
    file_hashes = defaultdict(list)
    
    for file_path in Path(directory).rglob('*'):
        if file_path.is_file():
            try:
                with open(file_path, 'rb') as f:
                    file_hash = hashlib.md5(f.read()).hexdigest()
                    file_hashes[file_hash].append(file_path)
            except:
                continue
    
    # Return only files with duplicates
    return {hash_val: paths for hash_val, paths in file_hashes.items() if len(paths) > 1}

def main():
    duplicates = find_duplicates('.')
    print(f"Found {len(duplicates)} sets of duplicate files")
    
    for hash_val, paths in duplicates.items():
        print(f"Duplicates: {[str(p) for p in paths]}")

if __name__ == "__main__":
    main()
