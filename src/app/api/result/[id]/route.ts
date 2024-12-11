import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // 这里可以从数据库获取结果
    // 现在先返回测试数据
    return NextResponse.json({
      id: params.id,
      totalScore: 85,
      dimensions: [
        {
          name: '性格匹配度',
          score: 88,
          description: '你们的性格特征高度互补，能够在关系中相互成长。'
        },
        {
          name: '生活习惯契合度',
          score: 92,
          description: '你们在生活方式上有很高的契合度。'
        },
        {
          name: '沟通方式相容度',
          score: 75,
          description: '沟通方式存在一些差异，但通过努力可以改善。'
        }
      ],
      analysis: {
        pattern: '互补发展型',
        potential: {
          level: '良好发展潜力',
          factors: [
            { area: '性格特征', impact: '积极' },
            { area: '生活习惯', impact: '积极' }
          ]
        }
      },
      details: {
        strengths: [
          {
            area: '性格特征',
            description: '性格互补，能够相互促进成长'
          }
        ],
        challenges: [
          {
            area: '沟通方式',
            suggestion: '建议多进行深入交流，理解对方的表达方式'
          }
        ]
      }
    });
  } catch (error) {
    return NextResponse.json(
      { error: '获取结果失败' },
      { status: 500 }
    );
  }
} 