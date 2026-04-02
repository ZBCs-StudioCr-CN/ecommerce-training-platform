// 风险事件共享数据类型
export interface RiskEvent {
  id: string;
  title: string;
  category: string;
  level: 'low' | 'medium' | 'high' | 'critical';
  platform: string;
  status: 'pending' | 'in_progress' | 'submitted' | 'completed';
  createdAt: string;
  deadline: string;
  description: string;
  hints: string[];
  referencePoints: Array<{
    item: string;
    weight: number;
    description: string;
  }>;
}

// 模拟风险事件数据（老师预设）
export const mockRiskEvents: RiskEvent[] = [
  {
    id: 'risk-001',
    title: '产品质量投诉：服装褪色严重',
    category: 'complaint',
    level: 'high',
    platform: 'taobao',
    status: 'pending',
    createdAt: '2024-01-15 10:30',
    deadline: '2024-01-15 18:00',
    description: `客户反馈购买的深蓝色牛仔裤第一次洗涤就严重褪色，导致其他衣物被染色。客户非常愤怒，要求退款并赔偿损失，同时表示要在平台上发布差评并向消费者协会投诉。

订单信息：
- 订单号：TB20240115001
- 商品：深蓝色牛仔裤
- 金额：¥199
- 客户等级：金牌会员（累计消费¥5,000+）

客户诉求：
1. 全额退款
2. 赔偿被染色的其他衣物（约¥500）
3. 公开道歉`,
    hints: [
      '分析产品是否存在质量问题',
      '评估客户价值和历史记录',
      '考虑平台规则和消费者权益保护法',
      '制定合理的赔偿方案',
      '预防类似问题再次发生',
    ],
    referencePoints: [
      { item: '响应速度', weight: 20, description: '在规定时间内快速响应' },
      { item: '方案合理性', weight: 30, description: '解决方案是否符合实际情况' },
      { item: '沟通技巧', weight: 20, description: '沟通方式是否专业、有同理心' },
      { item: '合规意识', weight: 15, description: '是否考虑相关法规和平台规则' },
      { item: '风险控制', weight: 15, description: '是否有效降低事态升级风险' },
    ],
  },
  {
    id: 'risk-002',
    title: '恶意差评攻击：竞争对手刷差评',
    category: 'negative-review',
    level: 'critical',
    platform: 'pdd',
    status: 'pending',
    createdAt: '2024-01-15 09:00',
    deadline: '2024-01-15 14:00',
    description: `店铺在短时间内收到20+条一星差评，内容高度相似，都声称产品有质量问题，但订单记录显示这些订单均未申请退货。

异常情况分析：
- 所有差评账号均为新注册用户
- 收货地址集中在同一区域
- 评价时间间隔极短（5-10分钟/条）
- 差评内容几乎完全一致

影响评估：
- 店铺评分从4.8降至3.2
- 今日订单量下降60%
- 部分老客户发消息询问情况`,
    hints: [
      '收集证据证明差评为恶意刷评',
      '向平台申诉的流程和材料准备',
      '公开回应维护品牌形象',
      '安抚老客户情绪',
      '预防未来类似攻击',
    ],
    referencePoints: [
      { item: '证据收集', weight: 25, description: '是否能有效收集并整理证据' },
      { item: '申诉策略', weight: 25, description: '平台申诉方案是否完整有效' },
      { item: '危机公关', weight: 20, description: '公开回应是否得当' },
      { item: '客户维护', weight: 15, description: '老客户关系维护措施' },
      { item: '预防机制', weight: 15, description: '后续预防措施是否完善' },
    ],
  },
  {
    id: 'risk-003',
    title: '知识产权侵权投诉：产品图片被投诉',
    category: 'platform-penalty',
    level: 'high',
    platform: 'amazon',
    status: 'pending',
    createdAt: '2024-01-14 16:00',
    deadline: '2024-01-16 16:00',
    description: `收到Amazon平台通知，产品Listing被投诉侵犯知识产权，涉及产品图片版权问题。

投诉详情：
- ASIN: B09XXXXX
- 投诉方：某品牌公司
- 投诉类型：图片版权侵权
- 涉及产品：已售出200+件

平台通知：
请在48小时内提供以下材料之一：
1. 授权证明
2. 原创证明
3. 版权不属于投诉方的证明

否则Listing将被下架，账户可能受限。`,
    hints: [
      '核实图片来源和授权情况',
      '评估投诉的有效性',
      '准备申诉材料',
      '考虑替代方案（更换图片/和解）',
      '预防未来侵权风险',
    ],
    referencePoints: [
      { item: '情况核实', weight: 20, description: '对侵权情况的准确判断' },
      { item: '申诉准备', weight: 30, description: '申诉材料的完整性和有效性' },
      { item: '风险评估', weight: 20, description: '对不同方案风险的评估' },
      { item: '方案选择', weight: 15, description: '最终方案选择的合理性' },
      { item: '预防措施', weight: 15, description: '后续版权管理机制' },
    ],
  },
  {
    id: 'risk-004',
    title: '舆情危机：直播翻车事件',
    category: 'public-opinion',
    level: 'critical',
    platform: 'douyin',
    status: 'pending',
    createdAt: '2024-01-15 11:00',
    deadline: '2024-01-15 16:00',
    description: `品牌在抖音直播间进行新品发布时，主播因不当言论引发争议。相关视频片段被大量转发，话题登上热搜，出现大量负面评论。

事件详情：
- 主播在介绍产品时使用了不当比喻
- 视频片段被截取后在社交媒体广泛传播
- #某某品牌直播翻车# 话题阅读量破千万
- 官方账号被大量网友留言攻击
- 部分合作KOL表示要终止合作

舆论走向：
- 80%评论为负面
- 开始出现抵制品牌的声音
- 媒体开始关注报道`,
    hints: [
      '快速评估事件影响范围',
      '制定公开声明策略',
      '处理主播责任问题',
      '安抚合作方情绪',
      '品牌形象修复计划',
    ],
    referencePoints: [
      { item: '响应速度', weight: 20, description: '危机响应是否及时' },
      { item: '声明内容', weight: 25, description: '公开声明是否得体、有诚意' },
      { item: '责任处理', weight: 20, description: '主播责任认定和处理方式' },
      { item: '舆论引导', weight: 20, description: '舆论引导策略是否有效' },
      { item: '长期修复', weight: 15, description: '品牌形象修复计划' },
    ],
  },
  {
    id: 'risk-005',
    title: '运营风险：促销活动价格设置错误',
    category: 'operation-risk',
    level: 'high',
    platform: 'taobao',
    status: 'pending',
    createdAt: '2024-01-15 08:30',
    deadline: '2024-01-15 12:00',
    description: `618大促期间，运营团队设置优惠券时出现错误，导致商品实际到手价远低于成本价。在发现问题前，已产生大量订单。

错误详情：
- 原计划：满300减50
- 实际设置：满50减300
- 问题商品：夏季连衣裙（成本¥120，售价¥199）
- 已下单：500+笔，到手价约¥49-¥99

损失估算：
- 每单亏损约¥70-¥120
- 总亏损约¥35,000-¥60,000
- 如全部发货将严重亏损
- 如取消订单将影响店铺信誉`,
    hints: [
      '评估法律风险和平台规则',
      '计算不同方案的成本损失',
      '制定止损方案',
      '客户沟通策略',
      '预防未来类似问题',
    ],
    referencePoints: [
      { item: '风险评估', weight: 25, description: '对不同方案风险的准确评估' },
      { item: '止损方案', weight: 25, description: '止损方案的经济性和可行性' },
      { item: '客户沟通', weight: 20, description: '客户沟通方式和补偿方案' },
      { item: '平台协调', weight: 15, description: '与平台沟通协调策略' },
      { item: '预防机制', weight: 15, description: '活动审核流程优化方案' },
    ],
  },
  {
    id: 'risk-006',
    title: '合规风险：广告宣传用语违规',
    category: 'compliance',
    level: 'medium',
    platform: 'pdd',
    status: 'pending',
    createdAt: '2024-01-14 14:00',
    deadline: '2024-01-16 14:00',
    description: `店铺多款商品详情页被平台标记为广告违规，涉及违反《广告法》相关条款。

违规详情：
- 问题1：使用"最""第一"等极限词（3处）
- 问题2：医疗效果宣传（护肤品声称"治疗敏感肌"）
- 问题3：虚假价格对比（虚构原价）

平台处理：
- 涉及商品已被下架
- 需在48小时内整改
- 累计违规将影响店铺权重

影响范围：
- 涉及SKU：12个
- 月销售额影响：约¥50,000`,
    hints: [
      '梳理所有违规内容',
      '学习广告法相关规定',
      '制定整改方案',
      '预防未来违规',
      '评估对店铺的影响',
    ],
    referencePoints: [
      { item: '法规理解', weight: 25, description: '对广告法相关条款的理解' },
      { item: '整改方案', weight: 30, description: '整改方案的完整性和时效性' },
      { item: '预防措施', weight: 25, description: '预防未来违规的机制' },
      { item: '影响评估', weight: 10, description: '对店铺影响的评估' },
      { item: '流程优化', weight: 10, description: '内容审核流程优化' },
    ],
  },
];

// 获取待处理风险事件数量
export const getPendingRiskCount = (): number => {
  return mockRiskEvents.filter(r => r.status === 'pending').length;
};
