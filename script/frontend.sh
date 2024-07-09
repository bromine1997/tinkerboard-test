#!/bin/bash
# 프론트엔드 배포 스크립트
# path 수정 가능
package_directory="/home/bromine/deploy/frontend/package"
archive_directory="/home/bromine/deploy/frontend/archive"

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
fi

# docker 빌드 & 실행
frontend_directory="$package_directory/boilerplate/frontend" # 임시 path(마음대로 지정 가능)
cd "$frontend_directory"
docker build -t "frontend-$timestamp" .
docker stop frontend
docker rm frontend
docker run -d -p 3000:80 --restart always --name frontend "frontend-$timestamp"
docker image prune -f

# 파일 최근 10개만 관리
cd "$archive_directory"
files_to_keep=$(ls -t | head -10)
ls | grep -v -e "$files_to_keep" | xargs rm
