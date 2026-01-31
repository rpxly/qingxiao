/**
 * 青销项目 - JavaScript功能实现
 * 作者: 创作团队
 * 日期: 2026-02-01
 * 版本: 1.0
 * 
 * 功能说明：
 * 1. 打字机效果 - 实现文字逐个显示和删除的动画效果
 * 2. 平滑滚动 - 实现导航链接点击后的平滑滚动效果
 * 3. 移动端菜单适配 - 根据屏幕尺寸自动调整菜单布局
 * 4. 进度条动画 - 当进度条进入视口时触发动画效果
 * 5. 创意彩蛋 - 控制台日志、深夜模式、摇一摇彩蛋
 */

// 等待DOM加载完成后执行所有JavaScript代码
document.addEventListener('DOMContentLoaded', function() {
    /**
     * 打字机效果实现
     * 功能：逐个显示文字，然后删除，循环显示不同短语
     */
    const typing = document.querySelector('.typing');
    if (typing) {
        // 从data-text属性获取短语列表
        let phrases = typing.dataset.text.split('|');
        let index = 0; // 当前短语索引
        let charIndex = 0; // 当前字符索引
        
        /**
         * 打字函数 - 逐个添加字符
         */
        function typeWriter() {
            if (charIndex < phrases[index].length) {
                // 添加当前字符
                typing.textContent += phrases[index].charAt(charIndex);
                charIndex++;
                // 延迟150ms继续添加下一个字符
                setTimeout(typeWriter, 150);
            } else {
                // 完整显示后等待2秒
                setTimeout(() => {
                    // 开始删除字符
                    deleteChars();
                }, 2000);
            }
        }
        
        /**
         * 删除函数 - 逐个删除字符
         */
        function deleteChars() {
            if (typing.textContent.length > 0) {
                // 删除最后一个字符
                typing.textContent = typing.textContent.slice(0, -1);
                // 延迟50ms继续删除下一个字符
                setTimeout(deleteChars, 50);
            } else {
                // 切换到下一个短语（循环）
                index = (index + 1) % phrases.length;
                charIndex = 0;
                // 延迟500ms开始显示下一个短语
                setTimeout(typeWriter, 500);
            }
        }
        
        // 启动打字机效果
        typeWriter();
    }
    
    /**
     * 平滑滚动效果实现
     * 功能：点击导航链接时平滑滚动到对应区域
     */
    const navLinks = document.querySelectorAll('nav a');
    if (navLinks.length > 0) {
        navLinks.forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                // 阻止默认跳转行为
                e.preventDefault();
                // 获取目标区域ID
                const targetId = this.getAttribute('href');
                // 获取目标元素
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    // 平滑滚动到目标元素（顶部偏移80px）
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }
    
    /**
     * 支持按钮点击效果
     * 功能：点击支持按钮时显示提示信息
     */
    const supportButton = document.getElementById('support');
    if (supportButton) {
        supportButton.addEventListener('click', function() {
            alert('感谢您的支持！请联系我们的团队成员了解具体支持方式。');
        });
    }
    
    /**
     * 支援我们选项点击效果
     * 功能：点击支援选项时显示感谢信息
     */
    const supportItems = document.querySelectorAll('.support-item');
    if (supportItems.length > 0) {
        supportItems.forEach(item => {
            item.addEventListener('click', function() {
                alert('感谢您的支持！请联系我们的团队成员了解具体支持方式。');
            });
        });
    }
    
    /**
     * 移动端菜单适配
     * 功能：根据屏幕尺寸自动调整菜单布局，优化移动端体验
     */
    function handleMobileMenu() {
        const nav = document.querySelector('nav');
        if (nav) {
            if (window.innerWidth <= 768) {
                // 移动端菜单 - 垂直布局，增加间距和触摸区域
                nav.style.flexDirection = 'column';
                nav.style.alignItems = 'center';
                nav.style.gap = '12px';
                
                // 优化移动端导航链接样式
                const navLinks = nav.querySelectorAll('a');
                navLinks.forEach(link => {
                    link.style.padding = '10px 16px';
                    link.style.fontSize = '16px';
                    link.style.borderRadius = '20px';
                    link.style.minWidth = '120px';
                    link.style.textAlign = 'center';
                });
            } else {
                // 桌面端菜单 - 水平布局
                nav.style.flexDirection = 'row';
                nav.style.alignItems = 'center';
                nav.style.gap = '2rem';
                
                // 恢复桌面端导航链接样式
                const navLinks = nav.querySelectorAll('a');
                navLinks.forEach(link => {
                    link.style.padding = '0.5rem 1rem';
                    link.style.fontSize = '1.1rem';
                    link.style.borderRadius = '20px';
                    link.style.minWidth = 'auto';
                    link.style.textAlign = 'center';
                });
            }
        }
    }
    
    // 初始调用菜单适配
    handleMobileMenu();
    
    // 窗口大小变化时重新适配菜单
    window.addEventListener('resize', handleMobileMenu);
    
    /**
     * 进度条动画效果增强
     * 功能：当进度条进入视口时触发动画效果
     */
    function animateProgressBars() {
        const progressBars = document.querySelectorAll('.progress-bar');
        if (progressBars.length > 0) {
            // 创建交叉观察器，监测元素是否进入视口
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        // 元素进入视口时添加动画
                        entry.target.style.animation = 'progress-animation 2s ease-in-out';
                        // 动画触发后停止观察该元素
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.5 }); // 当元素50%进入视口时触发
            
            // 观察所有进度条元素
            progressBars.forEach(bar => {
                observer.observe(bar);
            });
        }
    }
    
    // 启动进度条动画监测
    animateProgressBars();
    
    /**
     * 加载进度数据和团队工作状态数据
     * 功能：从JSON文件加载数据并更新到页面
     */
    function loadProgressAndWorkStatus() {
        console.log('开始加载进度和团队工作状态数据');
        // 并行加载两个JSON文件
        Promise.all([
            fetch('assets/data/progress.json').then(res => res.json()),
            fetch('assets/data/work_status.json').then(res => res.json())
        ]).then(([progressData, workStatusData]) => {
            console.log('成功加载进度数据:', progressData);
            console.log('成功加载团队工作状态数据:', workStatusData);
            
            // 找到里程碑区域
            const milestoneSection = document.getElementById('milestone');
            if (milestoneSection) {
                console.log('找到里程碑区域');
                
                // 清除里程碑区域中可能存在的旧容器
                const oldContainers = milestoneSection.querySelectorAll('.progress-container, .work-status-container, [style*="display: grid"], [style*="display: flex"]');
                oldContainers.forEach(container => container.remove());
                console.log('已清除旧容器:', oldContainers.length);
                
                // 创建主容器，占页面90%宽度
                const mainContainer = document.createElement('div');
                mainContainer.style.display = 'flex';
                mainContainer.style.width = '90%';
                mainContainer.style.maxWidth = '1400px';
                mainContainer.style.margin = '4rem auto 0';
                mainContainer.style.boxSizing = 'border-box';
                mainContainer.style.gap = '2rem';
                
                // 创建项目进度容器
                const progressContainer = document.createElement('div');
                progressContainer.style.width = '50%';
                progressContainer.style.padding = '2rem';
                progressContainer.style.background = 'rgba(255, 255, 255, 0.03)';
                progressContainer.style.borderRadius = '10px';
                progressContainer.style.border = '1px solid rgba(229, 49, 112, 0.2)';
                progressContainer.style.boxSizing = 'border-box';
                progressContainer.style.height = '550px';
                progressContainer.style.display = 'flex';
                progressContainer.style.flexDirection = 'column';
                progressContainer.style.justifyContent = 'center';
                
                // 添加进度标题
                const progressTitle = document.createElement('h3');
                progressTitle.textContent = '📊 项目进度';
                progressTitle.style.textAlign = 'center';
                progressTitle.style.marginBottom = '2rem';
                progressTitle.style.color = 'var(--accent-red)';
                progressTitle.style.fontSize = '1.8rem';
                progressContainer.appendChild(progressTitle);
                
                // 添加进度条
                progressData.milestones.forEach(milestone => {
                    console.log('添加进度条:', milestone.title, milestone.percent);
                    const progressBar = document.createElement('div');
                    progressBar.style.position = 'relative';
                    progressBar.style.width = '100%';
                    progressBar.style.height = '30px';
                    progressBar.style.background = 'rgba(255, 255, 255, 0.1)';
                    progressBar.style.borderRadius = '15px';
                    progressBar.style.marginBottom = '1.5rem';
                    progressBar.style.overflow = 'hidden';
                    
                    const progressFill = document.createElement('div');
                    progressFill.style.position = 'absolute';
                    progressFill.style.top = '0';
                    progressFill.style.left = '0';
                    progressFill.style.height = '100%';
                    progressFill.style.width = milestone.percent;
                    progressFill.style.background = 'linear-gradient(90deg, var(--accent-red), var(--accent-purple))';
                    progressFill.style.borderRadius = '15px';
                    progressFill.style.transition = 'width 1s ease-in-out';
                    progressBar.appendChild(progressFill);
                    
                    const progressText = document.createElement('span');
                    progressText.textContent = `${milestone.title}：${milestone.percent}`;
                    progressText.style.position = 'absolute';
                    progressText.style.top = '50%';
                    progressText.style.left = '50%';
                    progressText.style.transform = 'translate(-50%, -50%)';
                    progressText.style.color = 'var(--text-light)';
                    progressText.style.fontWeight = 'bold';
                    progressText.style.zIndex = '1';
                    progressBar.appendChild(progressText);
                    
                    progressContainer.appendChild(progressBar);
                });
                
                // 创建团队工作状态容器
                const workStatusContainer = document.createElement('div');
                workStatusContainer.style.width = '50%';
                workStatusContainer.style.padding = '2rem';
                workStatusContainer.style.background = 'rgba(255, 255, 255, 0.03)';
                workStatusContainer.style.borderRadius = '10px';
                workStatusContainer.style.border = '1px solid rgba(229, 49, 112, 0.2)';
                workStatusContainer.style.boxSizing = 'border-box';
                workStatusContainer.style.height = '550px';
                workStatusContainer.style.display = 'flex';
                workStatusContainer.style.flexDirection = 'column';
                
                // 添加工作状态标题
                const workStatusTitle = document.createElement('h3');
                workStatusTitle.textContent = '👥 团队工作状态';
                workStatusTitle.style.textAlign = 'center';
                workStatusTitle.style.marginBottom = '2rem';
                workStatusTitle.style.color = 'var(--accent-red)';
                workStatusTitle.style.fontSize = '1.8rem';
                workStatusContainer.appendChild(workStatusTitle);
                
                // 创建成员状态grid容器
                const membersContainer = document.createElement('div');
                membersContainer.style.display = 'grid';
                membersContainer.style.gridTemplateColumns = 'repeat(3, 1fr)';
                membersContainer.style.gridTemplateRows = 'repeat(2, 1fr)';
                membersContainer.style.gap = '0.8rem';
                membersContainer.style.flexGrow = '1';
                membersContainer.style.alignContent = 'center';
                
                // 响应式调整
                if (window.innerWidth <= 768) {
                    membersContainer.style.gridTemplateColumns = 'repeat(2, 1fr)';
                    membersContainer.style.gridTemplateRows = 'repeat(3, 1fr)';
                }
                if (window.innerWidth <= 480) {
                    membersContainer.style.gridTemplateColumns = '1fr';
                    membersContainer.style.gridTemplateRows = 'repeat(5, 1fr)';
                }
                
                // 添加团队成员工作状态
                workStatusData.team_status.forEach(member => {
                    console.log('添加团队成员工作状态:', member.name);
                    const memberStatus = document.createElement('div');
                    memberStatus.style.padding = '1.2rem';
                    memberStatus.style.background = 'linear-gradient(135deg, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.02))';
                    memberStatus.style.borderRadius = '12px';
                    memberStatus.style.border = '1px solid rgba(229, 49, 112, 0.3)';
                    memberStatus.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.05)';
                    memberStatus.style.textAlign = 'center';
                    memberStatus.style.height = '100%';
                    memberStatus.style.display = 'flex';
                    memberStatus.style.flexDirection = 'column';
                    memberStatus.style.justifyContent = 'center';
                    memberStatus.style.alignItems = 'center';
                    memberStatus.style.gap = '0.8rem';
                    memberStatus.style.boxSizing = 'border-box';
                    memberStatus.style.transition = 'all 0.4s ease';
                    memberStatus.style.position = 'relative';
                    memberStatus.style.overflow = 'hidden';
                    
                    // 添加装饰性渐变边框效果
                    memberStatus.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(229, 49, 112, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.05)';
                    
                    // 添加背景光效
                    const glowEffect = document.createElement('div');
                    glowEffect.style.position = 'absolute';
                    glowEffect.style.top = '-50%';
                    glowEffect.style.left = '-50%';
                    glowEffect.style.width = '200%';
                    glowEffect.style.height = '200%';
                    glowEffect.style.background = 'radial-gradient(circle, rgba(229, 49, 112, 0.1) 0%, transparent 70%)';
                    glowEffect.style.opacity = '0.3';
                    glowEffect.style.pointerEvents = 'none';
                    glowEffect.style.transition = 'opacity 0.4s ease';
                    memberStatus.appendChild(glowEffect);
                    
                    // 添加悬停动画效果
                    memberStatus.addEventListener('mouseenter', function() {
                        this.style.transform = 'translateY(-5px) scale(1.02)';
                        this.style.boxShadow = '0 8px 20px rgba(229, 49, 112, 0.3), 0 0 0 1px rgba(229, 49, 112, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.1)';
                        this.style.borderColor = 'rgba(229, 49, 112, 0.6)';
                        glowEffect.style.opacity = '0.6';
                    });
                    
                    memberStatus.addEventListener('mouseleave', function() {
                        this.style.transform = 'translateY(0) scale(1)';
                        this.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(229, 49, 112, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.05)';
                        this.style.borderColor = 'rgba(229, 49, 112, 0.3)';
                        glowEffect.style.opacity = '0.3';
                    });
                    
                    // 表情符号
                    const memberEmoji = document.createElement('div');
                    memberEmoji.textContent = member.emoji;
                    memberEmoji.style.fontSize = '1.5rem';
                    memberEmoji.style.transition = 'transform 0.3s ease';
                    memberStatus.appendChild(memberEmoji);
                    
                    // 成员名称
                    const memberName = document.createElement('h4');
                    memberName.textContent = member.nickname;
                    memberName.style.color = 'var(--text-light)';
                    memberName.style.fontSize = '0.9rem';
                    memberName.style.margin = '0';
                    memberName.style.fontWeight = 'bold';
                    memberName.style.textShadow = '0 0 10px rgba(229, 49, 112, 0.3)';
                    memberName.style.transition = 'color 0.3s ease';
                    memberStatus.appendChild(memberName);
                    
                    // 当前任务
                    const currentTask = document.createElement('p');
                    currentTask.textContent = member.current_task;
                    currentTask.style.color = 'var(--text-muted)';
                    currentTask.style.fontSize = '0.7rem';
                    currentTask.style.margin = '0';
                    currentTask.style.lineHeight = '1.3';
                    currentTask.style.maxWidth = '100px';
                    currentTask.style.wordBreak = 'break-word';
                    currentTask.style.transition = 'color 0.3s ease';
                    memberStatus.appendChild(currentTask);
                    
                    // 任务进度
                    const progressContainer = document.createElement('div');
                    progressContainer.style.width = '80%';
                    progressContainer.style.height = '6px';
                    progressContainer.style.background = 'rgba(255, 255, 255, 0.1)';
                    progressContainer.style.borderRadius = '3px';
                    progressContainer.style.overflow = 'hidden';
                    progressContainer.style.boxShadow = 'inset 0 1px 2px rgba(0, 0, 0, 0.3)';
                    
                    const taskProgressBar = document.createElement('div');
                    taskProgressBar.style.height = '100%';
                    taskProgressBar.style.width = member.progress;
                    taskProgressBar.style.background = 'linear-gradient(90deg, var(--accent-red), var(--accent-purple))';
                    taskProgressBar.style.borderRadius = '3px';
                    taskProgressBar.style.transition = 'width 1s ease-in-out';
                    taskProgressBar.style.boxShadow = '0 0 10px rgba(229, 49, 112, 0.5)';
                    
                    progressContainer.appendChild(taskProgressBar);
                    memberStatus.appendChild(progressContainer);
                    
                    // 进度百分比
                    const progressText = document.createElement('p');
                    progressText.textContent = member.progress;
                    progressText.style.color = 'var(--text-muted)';
                    progressText.style.fontSize = '0.6rem';
                    progressText.style.margin = '0';
                    progressText.style.fontWeight = '500';
                    progressText.style.transition = 'color 0.3s ease';
                    memberStatus.appendChild(progressText);
                    
                    // 增强悬停效果，包括内容动画
                    memberStatus.addEventListener('mouseenter', function() {
                        memberEmoji.style.transform = 'scale(1.1) rotate(5deg)';
                        memberName.style.color = 'var(--accent-red)';
                        currentTask.style.color = 'var(--text-light)';
                        progressText.style.color = 'var(--accent-red)';
                    });
                    
                    memberStatus.addEventListener('mouseleave', function() {
                        memberEmoji.style.transform = 'scale(1) rotate(0)';
                        memberName.style.color = 'var(--text-light)';
                        currentTask.style.color = 'var(--text-muted)';
                        progressText.style.color = 'var(--text-muted)';
                    });
                    
                    membersContainer.appendChild(memberStatus);
                });
                
                // 将成员容器添加到工作状态容器
                workStatusContainer.appendChild(membersContainer);
                
                // 将两个容器添加到主容器
                mainContainer.appendChild(progressContainer);
                mainContainer.appendChild(workStatusContainer);
                
                // 将主容器添加到里程碑区域
                milestoneSection.appendChild(mainContainer);
                
                // 延迟获取宽度，确保DOM已更新
                setTimeout(() => {
                    console.log('主容器已添加到页面');
                    console.log('主容器子元素数量:', mainContainer.children.length);
                    console.log('项目进度容器宽度:', progressContainer.offsetWidth);
                    console.log('团队工作状态容器宽度:', workStatusContainer.offsetWidth);
                }, 100);
                
                // 添加窗口大小变化监听器，实现响应式布局
                window.addEventListener('resize', function() {
                    if (window.innerWidth <= 480) {
                        membersContainer.style.gridTemplateColumns = '1fr';
                        membersContainer.style.gridTemplateRows = 'repeat(5, 1fr)';
                    } else if (window.innerWidth <= 768) {
                        membersContainer.style.gridTemplateColumns = 'repeat(2, 1fr)';
                        membersContainer.style.gridTemplateRows = 'repeat(3, 1fr)';
                    } else {
                        membersContainer.style.gridTemplateColumns = 'repeat(3, 1fr)';
                        membersContainer.style.gridTemplateRows = 'repeat(2, 1fr)';
                    }
                });
            } else {
                console.log('未找到里程碑区域');
            }
        })
        .catch(error => {
            console.log('加载数据失败:', error);
        });
    }
    
    // 启动进度和团队工作状态数据加载
    loadProgressAndWorkStatus();
    
    /**
 * 加载剧照花絮数据
 * 功能：从gallery.json文件加载剧照花絮数据并更新到页面
 */
function loadGalleryData() {
    console.log('开始加载剧照花絮数据');
    fetch('assets/data/gallery.json')
        .then(res => res.json())
        .then(data => {
            console.log('成功加载剧照花絮数据:', data);
            // 检查是否有剧照花絮数据
            if (data.gallery && data.gallery.length > 0) {
                console.log('剧照花絮数据数量:', data.gallery.length);
                // 找到里程碑区域
                const milestoneSection = document.getElementById('milestone');
                if (milestoneSection) {
                    console.log('找到里程碑区域，开始创建剧照花絮容器');
                    // 创建剧照花絮容器
                    const galleryContainer = document.createElement('div');
                        galleryContainer.id = 'gallery';
                        galleryContainer.style.marginTop = '4rem';
                        galleryContainer.style.padding = '2rem';
                        galleryContainer.style.background = 'rgba(255, 255, 255, 0.03)';
                        galleryContainer.style.borderRadius = '15px';
                        galleryContainer.style.border = '1px solid rgba(229, 49, 112, 0.2)';
                        galleryContainer.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.3)';
                        
                        // 添加标题
                        const galleryTitle = document.createElement('h3');
                        galleryTitle.textContent = '📷 剧照花絮';
                        galleryTitle.style.textAlign = 'center';
                        galleryTitle.style.marginBottom = '2rem';
                        galleryTitle.style.color = 'var(--accent-red)';
                        galleryTitle.style.fontSize = '1.8rem';
                        galleryTitle.style.textShadow = '0 0 10px rgba(229, 49, 112, 0.3)';
                        galleryContainer.appendChild(galleryTitle);
                        
                        // 计算轮播相关变量
                        const totalItems = data.gallery.length;
                        let itemsPerSlide = 3; // 默认PC端显示3张
                        if (window.innerWidth <= 768) {
                            itemsPerSlide = 1; // 移动端只显示1张
                        }
                        const maxIndex = Math.max(0, totalItems - itemsPerSlide);
                        
                        // 创建轮播容器
                        const carouselContainer = document.createElement('div');
                        carouselContainer.className = 'carousel-container';
                        carouselContainer.style.position = 'relative';
                        carouselContainer.style.maxWidth = '90%';
                        carouselContainer.style.width = '90%';
                        carouselContainer.style.margin = '0 auto';
                        carouselContainer.style.overflow = 'hidden';
                        carouselContainer.style.borderRadius = '10px';
                        carouselContainer.style.height = 'auto';
                        carouselContainer.style.minHeight = '300px';
                        carouselContainer.style.background = 'rgba(255, 255, 255, 0.03)';
                        carouselContainer.style.padding = '2rem';
                        carouselContainer.style.boxSizing = 'border-box';
                        
                        // 创建轮播轨道
                        const carouselTrack = document.createElement('div');
                        carouselTrack.className = 'carousel-track';
                        carouselTrack.style.display = 'flex';
                        carouselTrack.style.transition = 'transform 0.5s ease-in-out';
                        carouselTrack.style.width = '100%';
                        
                        // 添加剧照花絮到轮播
                        data.gallery.forEach((item, index) => {
                            const carouselItem = document.createElement('div');
                            carouselItem.className = 'carousel-item';
                            carouselItem.style.minWidth = `${100 / itemsPerSlide}%`;
                            carouselItem.style.width = `${100 / itemsPerSlide}%`;
                            carouselItem.style.padding = '0 8px';
                            carouselItem.style.transition = 'opacity 0.5s ease';
                            carouselItem.style.boxSizing = 'border-box';
                            
                            // 创建内容容器
                            const itemContainer = document.createElement('div');
                            itemContainer.style.display = 'flex';
                            itemContainer.style.flexDirection = 'column';
                            itemContainer.style.background = 'rgba(255, 255, 255, 0.05)';
                            itemContainer.style.borderRadius = '10px';
                            itemContainer.style.overflow = 'hidden';
                            itemContainer.style.boxShadow = '0 4px 16px rgba(0, 0, 0, 0.2)';
                            itemContainer.style.height = '100%';
                            itemContainer.style.boxSizing = 'border-box';
                            
                            // 图片容器（16:9比例）
                            const imageContainer = document.createElement('div');
                            imageContainer.style.position = 'relative';
                            imageContainer.style.width = '100%';
                            imageContainer.style.paddingTop = '56.25%'; // 16:9比例
                            imageContainer.style.overflow = 'hidden';
                            
                            // 图片
                            const image = document.createElement('img');
                            image.src = item.image;
                            image.alt = item.title;
                            image.style.position = 'absolute';
                            image.style.top = '0';
                            image.style.left = '0';
                            image.style.width = '100%';
                            image.style.height = '100%';
                            image.style.objectFit = 'cover';
                            
                            imageContainer.appendChild(image);
                            
                            // 内容容器
                            const contentContainer = document.createElement('div');
                            contentContainer.style.display = 'flex';
                            contentContainer.style.flexDirection = 'column';
                            contentContainer.style.justifyContent = 'space-between';
                            contentContainer.style.height = '100%';
                            
                            // 标题
                            const itemTitle = document.createElement('h4');
                            itemTitle.textContent = item.title;
                            itemTitle.style.color = 'var(--text-light)';
                            itemTitle.style.wordBreak = 'break-word';
                            itemTitle.style.textAlign = 'center';
                            
                            // 描述
                            const itemDescription = document.createElement('p');
                            itemDescription.textContent = item.description;
                            itemDescription.style.color = 'var(--text-muted)';
                            itemDescription.style.lineHeight = '1.6';
                            itemDescription.style.wordBreak = 'break-word';
                            itemDescription.style.textAlign = 'center';
                            
                            // 分类和日期
                            const itemMeta = document.createElement('div');
                            itemMeta.style.display = 'flex';
                            itemMeta.style.alignItems = 'center';
                            itemMeta.style.flexDirection = 'column';
                            itemMeta.style.gap = '0.3rem';
                            itemMeta.style.textAlign = 'center';
                            
                            // 响应式字体大小和间距
                            if (window.innerWidth <= 768) {
                                itemTitle.style.fontSize = '1.1rem';
                                itemTitle.style.marginBottom = '0.3rem';
                                itemDescription.style.fontSize = '0.8rem';
                                itemDescription.style.marginBottom = '0.8rem';
                                itemMeta.style.fontSize = '0.7rem';
                                contentContainer.style.padding = '1.2rem';
                            } else {
                                itemTitle.style.fontSize = '1.4rem';
                                itemTitle.style.marginBottom = '0.5rem';
                                itemDescription.style.fontSize = '0.9rem';
                                itemDescription.style.marginBottom = '1rem';
                                itemMeta.style.fontSize = '0.8rem';
                                contentContainer.style.padding = '2rem';
                            }
                            
                            // 分类
                            const itemCategory = document.createElement('span');
                            itemCategory.textContent = item.category;
                            itemCategory.style.color = 'var(--accent-red)';
                            itemCategory.style.fontWeight = 'bold';
                            
                            // 日期
                            const itemDate = document.createElement('span');
                            itemDate.textContent = item.date;
                            itemDate.style.color = 'var(--text-muted)';
                            
                            itemMeta.appendChild(itemCategory);
                            itemMeta.appendChild(itemDate);
                            
                            contentContainer.appendChild(itemTitle);
                            contentContainer.appendChild(itemDescription);
                            contentContainer.appendChild(itemMeta);
                            
                            itemContainer.appendChild(imageContainer);
                            itemContainer.appendChild(contentContainer);
                            
                            carouselItem.appendChild(itemContainer);
                            carouselTrack.appendChild(carouselItem);
                        });
                        
                        carouselContainer.appendChild(carouselTrack);
                        
                        // 添加前一张按钮
                        const prevButton = document.createElement('button');
                        prevButton.className = 'carousel-button prev';
                        prevButton.innerHTML = '<i class="fas fa-chevron-left"></i>';
                        prevButton.style.position = 'absolute';
                        prevButton.style.top = '50%';
                        prevButton.style.left = '20px';
                        prevButton.style.transform = 'translateY(-50%)';
                        prevButton.style.width = '45px';
                        prevButton.style.height = '45px';
                        prevButton.style.borderRadius = '50%';
                        prevButton.style.background = 'rgba(229, 49, 112, 0.7)';
                        prevButton.style.color = 'white';
                        prevButton.style.border = '2px solid rgba(255, 255, 255, 0.3)';
                        prevButton.style.fontSize = '28px';
                        prevButton.style.fontWeight = 'bold';
                        prevButton.style.cursor = 'pointer';
                        prevButton.style.zIndex = '10';
                        prevButton.style.boxShadow = '0 4px 16px rgba(0, 0, 0, 0.4)';
                        prevButton.style.transition = 'all 0.3s ease';
                        prevButton.style.display = 'flex';
                        prevButton.style.justifyContent = 'center';
                        prevButton.style.alignItems = 'center';
                        prevButton.style.backdropFilter = 'blur(5px)';
                        
                        prevButton.addEventListener('mouseenter', function() {
                            this.style.background = 'var(--accent-red)';
                            this.style.transform = 'translateY(-50%) scale(1.15)';
                            this.style.boxShadow = '0 6px 20px rgba(229, 49, 112, 0.5)';
                            this.style.borderColor = 'rgba(255, 255, 255, 0.8)';
                        });
                        
                        prevButton.addEventListener('mouseleave', function() {
                            this.style.background = 'rgba(229, 49, 112, 0.7)';
                            this.style.transform = 'translateY(-50%) scale(1)';
                            this.style.boxShadow = '0 4px 16px rgba(0, 0, 0, 0.4)';
                            this.style.borderColor = 'rgba(255, 255, 255, 0.3)';
                        });
                        
                        prevButton.addEventListener('click', function() {
                            this.style.transform = 'translateY(-50%) scale(0.95)';
                            setTimeout(() => {
                                this.style.transform = 'translateY(-50%) scale(1)';
                            }, 150);
                        });
                        
                        carouselContainer.appendChild(prevButton);
                        
                        // 添加后一张按钮
                        const nextButton = document.createElement('button');
                        nextButton.className = 'carousel-button next';
                        nextButton.innerHTML = '<i class="fas fa-chevron-right"></i>';
                        nextButton.style.position = 'absolute';
                        nextButton.style.top = '50%';
                        nextButton.style.right = '20px';
                        nextButton.style.transform = 'translateY(-50%)';
                        nextButton.style.width = '45px';
                        nextButton.style.height = '45px';
                        nextButton.style.borderRadius = '50%';
                        nextButton.style.background = 'rgba(229, 49, 112, 0.7)';
                        nextButton.style.color = 'white';
                        nextButton.style.border = '2px solid rgba(255, 255, 255, 0.3)';
                        nextButton.style.fontSize = '28px';
                        nextButton.style.fontWeight = 'bold';
                        nextButton.style.cursor = 'pointer';
                        nextButton.style.zIndex = '10';
                        nextButton.style.boxShadow = '0 4px 16px rgba(0, 0, 0, 0.4)';
                        nextButton.style.transition = 'all 0.3s ease';
                        nextButton.style.display = 'flex';
                        nextButton.style.justifyContent = 'center';
                        nextButton.style.alignItems = 'center';
                        nextButton.style.backdropFilter = 'blur(5px)';
                        
                        nextButton.addEventListener('mouseenter', function() {
                            this.style.background = 'var(--accent-red)';
                            this.style.transform = 'translateY(-50%) scale(1.15)';
                            this.style.boxShadow = '0 6px 20px rgba(229, 49, 112, 0.5)';
                            this.style.borderColor = 'rgba(255, 255, 255, 0.8)';
                        });
                        
                        nextButton.addEventListener('mouseleave', function() {
                            this.style.background = 'rgba(229, 49, 112, 0.7)';
                            this.style.transform = 'translateY(-50%) scale(1)';
                            this.style.boxShadow = '0 4px 16px rgba(0, 0, 0, 0.4)';
                            this.style.borderColor = 'rgba(255, 255, 255, 0.3)';
                        });
                        
                        nextButton.addEventListener('click', function() {
                            this.style.transform = 'translateY(-50%) scale(0.95)';
                            setTimeout(() => {
                                this.style.transform = 'translateY(-50%) scale(1)';
                            }, 150);
                        });
                        
                        carouselContainer.appendChild(nextButton);
                        
                        // 添加指示器
                        const indicators = document.createElement('div');
                        indicators.className = 'carousel-indicators';
                        indicators.style.display = 'flex';
                        indicators.style.justifyContent = 'center';
                        indicators.style.marginTop = '1.5rem';
                        indicators.style.gap = '0.75rem';
                        indicators.style.paddingBottom = '20px';
                        
                        // 计算需要的指示器数量
                        const indicatorCount = Math.max(1, maxIndex + 1);
                        
                        for (let i = 0; i < indicatorCount; i++) {
                            const indicator = document.createElement('button');
                            indicator.className = 'carousel-indicator';
                            indicator.style.width = '14px';
                            indicator.style.height = '14px';
                            indicator.style.borderRadius = '50%';
                            indicator.style.background = 'rgba(255, 255, 255, 0.2)';
                            indicator.style.border = '2px solid rgba(229, 49, 112, 0.3)';
                            indicator.style.cursor = 'pointer';
                            indicator.style.transition = 'all 0.3s ease';
                            indicator.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.3)';
                            
                            if (i === 0) {
                                indicator.style.background = 'var(--accent-red)';
                                indicator.style.borderColor = 'rgba(255, 255, 255, 0.8)';
                                indicator.style.transform = 'scale(1.1)';
                            }
                            
                            indicator.addEventListener('mouseenter', function() {
                                this.style.background = 'rgba(229, 49, 112, 0.6)';
                                this.style.borderColor = 'rgba(255, 255, 255, 0.6)';
                                this.style.transform = 'scale(1.2)';
                            });
                            
                            indicator.addEventListener('mouseleave', function() {
                                if (i !== currentIndex) {
                                    this.style.background = 'rgba(255, 255, 255, 0.2)';
                                    this.style.borderColor = 'rgba(229, 49, 112, 0.3)';
                                    this.style.transform = 'scale(1)';
                                }
                            });
                            
                            indicator.addEventListener('click', function() {
                                currentIndex = i;
                                updateCarousel();
                                this.style.transform = 'scale(0.95)';
                                setTimeout(() => {
                                    this.style.transform = 'scale(1.1)';
                                }, 150);
                            });
                            
                            indicators.appendChild(indicator);
                        }
                        
                        carouselContainer.appendChild(indicators);
                        
                        galleryContainer.appendChild(carouselContainer);
                        
                        // 将剧照花絮容器添加到里程碑区域
                        milestoneSection.appendChild(galleryContainer);
                        
                        // 轮播功能
                        let currentIndex = 0;
                        
                        function updateCarousel() {
                            const track = carouselContainer.querySelector('.carousel-track');
                            const items = carouselContainer.querySelectorAll('.carousel-item');
                            const indicators = carouselContainer.querySelectorAll('.carousel-indicator');
                            
                            // 确保currentIndex不超出范围
                            currentIndex = Math.min(currentIndex, maxIndex);
                            currentIndex = Math.max(currentIndex, 0);
                            
                            // 更新轨道位置
                            track.style.transform = `translateX(-${currentIndex * (100 / itemsPerSlide)}%)`;
                            
                            // 更新指示器
                            indicators.forEach((indicator, index) => {
                                if (index === currentIndex) {
                                    indicator.style.background = 'var(--accent-red)';
                                } else {
                                    indicator.style.background = 'rgba(255, 255, 255, 0.3)';
                                }
                            });
                        }
                        
                        // 前一张
                        prevButton.addEventListener('click', function() {
                            currentIndex = (currentIndex - 1 + (maxIndex + 1)) % (maxIndex + 1);
                            updateCarousel();
                        });
                        
                        // 后一张
                        nextButton.addEventListener('click', function() {
                            currentIndex = (currentIndex + 1) % (maxIndex + 1);
                            updateCarousel();
                        });
                        
                        // 自动播放
                        let autoplayInterval = setInterval(function() {
                            currentIndex = (currentIndex + 1) % (maxIndex + 1);
                            updateCarousel();
                        }, 5000);
                        
                        // 鼠标悬停时暂停自动播放
                        carouselContainer.addEventListener('mouseenter', function() {
                            clearInterval(autoplayInterval);
                        });
                        
                        // 鼠标离开时恢复自动播放
                        carouselContainer.addEventListener('mouseleave', function() {
                            autoplayInterval = setInterval(function() {
                                currentIndex = (currentIndex + 1) % (maxIndex + 1);
                                updateCarousel();
                            }, 5000);
                        });
                        
                        // 窗口大小变化时重新计算轮播配置
                        window.addEventListener('resize', function() {
                            // 重新计算显示数量
                            let newItemsPerSlide = 3;
                            if (window.innerWidth <= 768) {
                                newItemsPerSlide = 1;
                            }
                            
                            // 如果显示数量发生变化，重新创建轮播
                            if (newItemsPerSlide !== itemsPerSlide) {
                                // 移除旧的轮播容器
                                const oldCarouselContainer = document.querySelector('.carousel-container');
                                if (oldCarouselContainer) {
                                    oldCarouselContainer.parentNode.removeChild(oldCarouselContainer);
                                }
                                
                                // 重新加载图库数据
                                loadGalleryData();
                            }
                        });
                    }
                }
            })
            .catch(error => {
                console.log('加载剧照花絮数据失败:', error);
            });
    }
    
    // 启动剧照花絮数据加载
    loadGalleryData();
    
    /**
     * 创意彩蛋：控制台团队吐槽日志
     * 功能：在浏览器控制台显示团队成员的趣味吐槽
     */
    function consoleEasterEgg() {
        console.log('%c🌌 青销野生制片厂团队日志 🌌', 'color: #e53170; font-size: 16px; font-weight: bold;');
        console.log('%c-------------------------------', 'color: #a7a9be;');
        console.log('%c孚孚：文案写不完了，救命！', 'color: #fffffe;');
        console.log('%c小雅：P图好累，但为了好看值得！', 'color: #fffffe;');
        console.log('%c章鱼：代码又报错了，我需要咖啡...', 'color: #fffffe;');
        console.log('%c肖传：Git又冲突了，谁来救救我？', 'color: #fffffe;');
        console.log('%c清清：测试发现bug，快来修复！', 'color: #fffffe;');
        console.log('%c-------------------------------', 'color: #a7a9be;');
        console.log('%c感谢你发现这个彩蛋！请继续支持我们的创作～', 'color: #e53170;');
    }
    
    // 启动控制台彩蛋
    consoleEasterEgg();
    
    /**
     * 创意彩蛋：深夜模式隐藏内容
     * 功能：在深夜12点到凌晨6点显示隐藏的夜间模式内容
     */
    function checkNightMode() {
        const now = new Date();
        const hour = now.getHours();
        
        // 深夜12点到凌晨6点
        if (hour >= 0 && hour < 6) {
            // 创建隐藏内容元素
            const hiddenContent = document.createElement('div');
            hiddenContent.id = 'night-egg';
            
            // 设置隐藏内容样式
            hiddenContent.style.cssText = `
                position: fixed;
                bottom: 20px;
                right: 20px;
                width: 60px;
                height: 60px;
                border-radius: 50%;
                background: rgba(229, 49, 112, 0.8);
                display: flex;
                justify-content: center;
                align-items: center;
                color: white;
                cursor: pointer;
                z-index: 9999;
                animation: pulse 2s infinite;
            `;
            
            // 添加脉冲动画样式
            const style = document.createElement('style');
            style.textContent = `
                @keyframes pulse {
                    0% { transform: scale(1); opacity: 0.8; }
                    50% { transform: scale(1.1); opacity: 1; }
                    100% { transform: scale(1); opacity: 0.8; }
                }
            `;
            document.head.appendChild(style);
            
            // 设置显示内容和标题
            hiddenContent.textContent = '🌙';
            hiddenContent.title = '深夜模式：点击查看隐藏番外';
            
            // 添加点击事件 - 显示隐藏番外内容
            hiddenContent.addEventListener('click', function() {
                alert('✨ 深夜模式激活！\n\n隐藏番外：\n韩墨阳在深夜的古代庭院中独自饮酒，突然看到了现代世界的幻象...\n\n尚在现代的雨夜中撑伞漫步，似乎听到了来自古代的呼唤...\n\n两人的命运线正在逐渐交织...');
            });
            
            // 将隐藏内容添加到页面
            document.body.appendChild(hiddenContent);
        }
    }
    
    // 检查是否为深夜模式
    checkNightMode();
    
    /**
     * 创意彩蛋：摇一摇彩蛋
     * 功能：检测设备摇晃，显示团队小秘密
     */
    function shakeEasterEgg() {
        let lastTime = 0; // 上次检测时间
        let lastX = 0; // 上次X轴加速度
        let lastY = 0; // 上次Y轴加速度
        let lastZ = 0; // 上次Z轴加速度
        
        // 检查是否支持devicemotion事件（移动端设备）
        if (window.DeviceMotionEvent) {
            // 添加设备运动事件监听器
            window.addEventListener('devicemotion', function(e) {
                const currentTime = new Date().getTime();
                
                // 限制检测频率，每100ms检测一次
                if (currentTime - lastTime > 100) {
                    const acceleration = e.accelerationIncludingGravity;
                    if (acceleration) {
                        // 获取当前加速度值（默认值为0）
                        const currentX = acceleration.x || 0;
                        const currentY = acceleration.y || 0;
                        const currentZ = acceleration.z || 0;
                        
                        // 计算加速度变化值
                        const deltaX = Math.abs(currentX - lastX);
                        const deltaY = Math.abs(currentY - lastY);
                        const deltaZ = Math.abs(currentZ - lastZ);
                        
                        // 检测摇晃强度（阈值为15）
                        if (deltaX > 15 || deltaY > 15 || deltaZ > 15) {
                            // 显示摇一摇彩蛋
                            alert('🎁 恭喜你发现了摇一摇彩蛋！\n\n团队小秘密：\n我们经常在群里讨论剧情到深夜，\n每个人都为这个项目付出了很多心血。\n\n感谢你的支持！');
                        }
                        
                        // 更新上次检测时间和加速度值
                        lastTime = currentTime;
                        lastX = currentX;
                        lastY = currentY;
                        lastZ = currentZ;
                    }
                }
            });
        }
    }
    
    /**
     * 加载团队成员数据
     * 功能：从team.json文件加载团队成员数据并更新到页面
     */
    function loadTeamData() {
        console.log('开始加载团队成员数据');
        fetch('assets/data/team.json')
            .then(res => res.json())
            .then(data => {
                console.log('成功加载团队成员数据:', data);
                // 找到团队成员容器
                const teamContainer = document.getElementById('team-members-container');
                if (teamContainer) {
                    console.log('找到团队成员容器');
                    // 清空容器
                    teamContainer.innerHTML = '';
                    
                    // 添加团队成员
                    data.team.forEach(member => {
                        console.log('添加团队成员:', member.name);
                        const memberElement = document.createElement('div');
                        memberElement.className = 'member';
                        
                        // 创建内容
                        memberElement.innerHTML = `
                            <div class="member-avatar">
                                <img src="${member.avatar}" alt="${member.name}" style="width: 100%; height: 100%; border-radius: 50%; object-fit: cover;">
                            </div>
                            <h4>${member.nickname}</h4>
                            <p>${member.role}</p>
                        `;
                        
                        teamContainer.appendChild(memberElement);
                    });
                    
                    console.log('团队成员已添加到页面');
                } else {
                    console.log('未找到团队成员容器');
                }
            })
            .catch(error => {
                console.log('加载团队成员数据失败:', error);
            });
    }
    
    /**
 * 图片懒加载功能
 * 功能：优化图片加载，只在图片进入视口时才加载
 * 实现原理：使用IntersectionObserver监测图片是否进入视口，进入时才加载真实图片
 * 降级方案：不支持IntersectionObserver时，立即加载所有图片
 */
function initLazyLoading() {
    // 检查是否支持IntersectionObserver
    if ('IntersectionObserver' in window) {
        // 创建交叉观察器实例
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const image = entry.target;
                    // 加载真实图片
                    const src = image.dataset.src;
                    if (src) {
                        image.src = src;
                        // 添加淡入效果，提升用户体验
                        image.style.opacity = '0';
                        image.style.transition = 'opacity 0.5s ease-in-out';
                        setTimeout(() => {
                            image.style.opacity = '1';
                        }, 100);
                    }
                    // 停止观察已加载的图片，避免重复处理
                    observer.unobserve(image);
                }
            });
        });
        
        // 观察所有带有data-src属性的图片
        const lazyImages = document.querySelectorAll('img[data-src]');
        lazyImages.forEach(img => {
            imageObserver.observe(img);
        });
    } else {
        // 降级方案：立即加载所有图片
        const lazyImages = document.querySelectorAll('img[data-src]');
        lazyImages.forEach(img => {
            const src = img.dataset.src;
            if (src) {
                img.src = src;
            }
        });
    }
}
    
/**
 * 优化图片加载体验
 * 功能：为图片添加加载状态和错误处理，提升用户体验
 * 实现原理：为所有图片添加加载和错误事件监听器，处理不同状态下的样式
 */
function optimizeImageLoading() {
    // 为所有图片添加加载状态
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        // 添加加载失败处理
        img.addEventListener('error', function() {
            // 图片加载失败时隐藏图片
            this.style.display = 'none'; // 隐藏加载失败的图片
        });
        
        // 添加加载完成处理
        img.addEventListener('load', function() {
            // 图片加载完成后设置透明度为1
            this.style.opacity = '1';
        });
        
        // 初始设置透明度
        if (!this.complete) {
            // 图片未加载完成时设置透明度为0
            this.style.opacity = '0';
            // 添加透明度过渡效果
            this.style.transition = 'opacity 0.5s ease-in-out';
        }
    });
}
    
    // 启动图片懒加载
    initLazyLoading();
    
    // 优化图片加载体验
    optimizeImageLoading();
    
    // 启动团队成员数据加载
    loadTeamData();
    
    // 启动摇一摇彩蛋
    shakeEasterEgg();
});