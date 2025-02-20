export interface StatCardData {
    id: string;
    title: string;
    value: string | number;
    icon: string;
    change: string;
    period: string;
    changeType: 'positive' | 'negative' | 'neutral';
}

export interface ChartData {
    id: string;
    title: string;
    subtitle: string;
    updated: string;
    chartType: 'line' | 'bar' | 'pie';
    data: any[];
}

export interface ProjectData {
    id: string;
    name: string;
    company: string;
    companyLogo: string;
    companyLogoColor: string;
    members: string[];
    budget: string;
    completion: number;
}

export interface OrderData {
    id: string;
    title: string;
    timestamp: string;
    icon: string;
}

export interface DashboardData {
    stats: StatCardData[];
    charts: ChartData[];
    projects: ProjectData[];
    orders: OrderData[];
    performance: {
        monthlyChange: string;
        changeType: 'positive' | 'negative' | 'neutral';
    };
}