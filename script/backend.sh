#!/bin/bash
# 백엔드 배포 스크립트

archive_directory="/home/linaro/deploy/backend/archive"

if [ ! -d "$archive_directory" ]; then
    mkdir -p "$archive_directory"
    echo "Archive directory created."
else
    echo "Archive directory already exists."
fi

# GitHub 프로젝트 주소와 압축 파일 이름을 지정 (마음대로 지정 가능)
github_url="https://github.com/khyw407/tinkerboard-test/archive/master.tar.gz"
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

# 압축해제 & 심볼릭링크 설정
package_directory="/home/linaro/deploy/backend/package"
mv "$new_archive_name" "$archive_directory"

ln -s "$archive_directory/tinkerboard-master-$timestamp" "$package_directory"

if [ -f "$new_archive_name" ]; then
    tar -zxvf "$new_archive_name" -C "$package_directory" --strip-components=1
    echo "압축 해제 완료"
fi

# pm2 재실행
# path는 임시(마음대로 지정 가능)
cd "$package_directory/boilerplate/backend" 
  && npm install 
  && npm run build 
  && pm2 delete ecosystem.config.js 
  && pm2 start ecosystem.config.js
