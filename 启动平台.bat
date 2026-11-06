@echo off
chcp 65001 >nul
title 电商实训平台

cd /d "%~dp0"

echo ========================================
echo   电商实训平台 - 启动中...
echo ========================================
echo.

REM 检查 out 目录是否存在
if not exist "out\index.html" (
    echo [1/3] 首次运行，正在安装依赖...
    call npm install --ignore-scripts
    if errorlevel 1 (
        echo 依赖安装失败，请检查网络连接
        pause
        exit /b 1
    )

    echo.
    echo [2/3] 正在构建项目...
    call npm run build
    if errorlevel 1 (
        echo 构建失败
        pause
        exit /b 1
    )
) else (
    echo [1/2] 检测到已构建，跳过构建步骤
)

echo.
echo [启动] 正在启动本地服务器 (端口 5000)...
echo.
echo ========================================
echo   平台地址: http://localhost:5000
echo   按 Ctrl+C 停止服务器
echo ========================================
echo.

REM 打开浏览器
start "" "http://localhost:5000"

REM 启动零依赖静态服务器（仅需 Node.js，无需安装任何包）
node static-server.js 5000 out

pause
