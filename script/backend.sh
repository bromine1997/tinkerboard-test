#!/bin/bash
# 백엔드 배포 스크립트
# path 수정 가능
package_directory="/mnt/c/Users/bromine/deploy/backend/package"
archive_directory="/mnt/c/Users/bromine/deploy/backend/archive"

if [ ! -d "$package_directory" ]; then
    mkdir -p "$package_directory"
    echo "Package directory created."
else
    echo "Package directory already exists."
fi

if [ ! -d "$archive_directory" ]; then
    mkdir -p "$archive_directory"
    echo "Archive directory created."
else
    echo "Archive directory already exists."
fi

# GitHub 프로젝트 주소와 압축 파일 이름을 지정 (마음대로 지정 가능)
github_url="https://github.com/bromine1997/tinkerboard-test/archive/master.tar.gz"
archive_name="master.tar.gz"
timestamp=$(date +"%Y%m%d%H%M%S")
new_archive_name="tinkerboard-master-$timestamp.tar.gz"

# 다운로드 디렉토리로 이동합니다.
cd "$archive_directory" || exit

# 이미 파일이 존재하는지 확인하고, 없으면 다운로드합니다.
if [ ! -f "$archive_name" ]; then
    echo "다운로드 중: $github_url"
    wget "$github_url"
    echo "다운로드 완료: $archive_name"
else
    echo "이미 파일이 존재합니다: $archive_name"
fi

mv "$archive_name" "$new_archive_name"

# 압축해제
if [ -f "$new_archive_name" ]; then
    tar -zxvf "$new_archive_name" -C "$package_directory" --strip-components=1
    echo "압축 해제 완료"
else
    echo "압축 파일이 존재하지 않습니다: $new_archive_name"
    exit 1
fi

# backend_directory 설정
backend_directory="$package_directory/boilerplate/backend" # path는 임시(마음대로 지정 가능)
cd "$backend_directory" || { echo "디렉토리 이동 실패: $backend_directory"; exit 1; }

# npm 설치 및 빌드
npm install || { echo "npm install 실패"; exit 1; }
npm run build || { echo "Build script missing or failed"; exit 1; }

# pm2 재실행
pm2 delete ecosystem.config.js || { echo "ecosystem.config.js 삭제 실패"; exit 1; }
pm2 start ecosystem.config.js || { echo "ecosystem.config.js not found"; exit 1; }

# 파일 최근 10개만 관리
cd "$archive_directory"
files_to_keep=$(ls -t | head -10)
ls | grep -v -e "$(echo $files_to_keep | tr ' ' '\n' | paste -sd '|' -)" | xargs rm || { echo "No files to remove"; }

# 파일 최근 10개만 관리
cd "$archive_directory"
files_to_keep=$(ls -t | head -10)
ls | grep -v -e "$files_to_keep" | xargs rm
