export declare const missingTools: ({
    name: string;
    description: string;
    inputSchema: {
        type: string;
        properties: {
            name: {
                type: string;
                description: string;
            };
            email: {
                type: string;
                description: string;
            };
            phone: {
                type: string;
                description: string;
            };
            address: {
                type: string;
                description: string;
            };
            tier: {
                type: string;
                enum: string[];
                description: string;
            };
            status: {
                type: string;
                enum: string[];
                description: string;
            };
            commissionRate: {
                type: string;
                description: string;
            };
            id?: never;
            page?: never;
            pageSize?: never;
            code?: never;
            type?: never;
            description?: never;
            isActive?: never;
            currency?: never;
            taxRate?: never;
            entityType?: never;
            entityId?: never;
            languageCode?: never;
            fields?: never;
            isRequired?: never;
            isFilterable?: never;
        };
        required: string[];
    };
} | {
    name: string;
    description: string;
    inputSchema: {
        type: string;
        properties: {
            id: {
                type: string;
                description: string;
            };
            name?: never;
            email?: never;
            phone?: never;
            address?: never;
            tier?: never;
            status?: never;
            commissionRate?: never;
            page?: never;
            pageSize?: never;
            code?: never;
            type?: never;
            description?: never;
            isActive?: never;
            currency?: never;
            taxRate?: never;
            entityType?: never;
            entityId?: never;
            languageCode?: never;
            fields?: never;
            isRequired?: never;
            isFilterable?: never;
        };
        required: string[];
    };
} | {
    name: string;
    description: string;
    inputSchema: {
        type: string;
        properties: {
            status: {
                type: string;
                enum: string[];
                description: string;
            };
            tier: {
                type: string;
                enum: string[];
                description: string;
            };
            page: {
                type: string;
                default: number;
            };
            pageSize: {
                type: string;
                default: number;
            };
            name?: never;
            email?: never;
            phone?: never;
            address?: never;
            commissionRate?: never;
            id?: never;
            code?: never;
            type?: never;
            description?: never;
            isActive?: never;
            currency?: never;
            taxRate?: never;
            entityType?: never;
            entityId?: never;
            languageCode?: never;
            fields?: never;
            isRequired?: never;
            isFilterable?: never;
        };
        required?: never;
    };
} | {
    name: string;
    description: string;
    inputSchema: {
        type: string;
        properties: {
            id: {
                type: string;
                description: string;
            };
            name: {
                type: string;
                description: string;
            };
            email: {
                type: string;
                description: string;
            };
            phone: {
                type: string;
                description: string;
            };
            address: {
                type: string;
                description: string;
            };
            tier: {
                type: string;
                enum: string[];
                description?: never;
            };
            commissionRate: {
                type: string;
                description: string;
            };
            status?: never;
            page?: never;
            pageSize?: never;
            code?: never;
            type?: never;
            description?: never;
            isActive?: never;
            currency?: never;
            taxRate?: never;
            entityType?: never;
            entityId?: never;
            languageCode?: never;
            fields?: never;
            isRequired?: never;
            isFilterable?: never;
        };
        required: string[];
    };
} | {
    name: string;
    description: string;
    inputSchema: {
        type: string;
        properties: {
            name: {
                type: string;
                description: string;
            };
            code: {
                type: string;
                description: string;
            };
            type: {
                type: string;
                enum: string[];
                description: string;
            };
            description: {
                type: string;
                description: string;
            };
            isActive: {
                type: string;
                default: boolean;
                description?: never;
            };
            currency: {
                type: string;
                default: string;
                description: string;
            };
            taxRate: {
                type: string;
                description: string;
            };
            email?: never;
            phone?: never;
            address?: never;
            tier?: never;
            status?: never;
            commissionRate?: never;
            id?: never;
            page?: never;
            pageSize?: never;
            entityType?: never;
            entityId?: never;
            languageCode?: never;
            fields?: never;
            isRequired?: never;
            isFilterable?: never;
        };
        required: string[];
    };
} | {
    name: string;
    description: string;
    inputSchema: {
        type: string;
        properties: {
            type: {
                type: string;
                enum: string[];
                description: string;
            };
            isActive: {
                type: string;
                description: string;
                default?: never;
            };
            page: {
                type: string;
                default: number;
            };
            pageSize: {
                type: string;
                default: number;
            };
            name?: never;
            email?: never;
            phone?: never;
            address?: never;
            tier?: never;
            status?: never;
            commissionRate?: never;
            id?: never;
            code?: never;
            description?: never;
            currency?: never;
            taxRate?: never;
            entityType?: never;
            entityId?: never;
            languageCode?: never;
            fields?: never;
            isRequired?: never;
            isFilterable?: never;
        };
        required?: never;
    };
} | {
    name: string;
    description: string;
    inputSchema: {
        type: string;
        properties: {
            id: {
                type: string;
                description: string;
            };
            name: {
                type: string;
                description: string;
            };
            description: {
                type: string;
                description: string;
            };
            isActive: {
                type: string;
                default?: never;
                description?: never;
            };
            currency: {
                type: string;
                description: string;
                default?: never;
            };
            taxRate: {
                type: string;
                description: string;
            };
            email?: never;
            phone?: never;
            address?: never;
            tier?: never;
            status?: never;
            commissionRate?: never;
            page?: never;
            pageSize?: never;
            code?: never;
            type?: never;
            entityType?: never;
            entityId?: never;
            languageCode?: never;
            fields?: never;
            isRequired?: never;
            isFilterable?: never;
        };
        required: string[];
    };
} | {
    name: string;
    description: string;
    inputSchema: {
        type: string;
        properties: {
            entityType: {
                type: string;
                enum: string[];
                description: string;
            };
            entityId: {
                type: string;
                description: string;
            };
            languageCode: {
                type: string;
                enum: string[];
                description: string;
            };
            fields: {
                type: string;
                description: string;
            };
            name?: never;
            email?: never;
            phone?: never;
            address?: never;
            tier?: never;
            status?: never;
            commissionRate?: never;
            id?: never;
            page?: never;
            pageSize?: never;
            code?: never;
            type?: never;
            description?: never;
            isActive?: never;
            currency?: never;
            taxRate?: never;
            isRequired?: never;
            isFilterable?: never;
        };
        required: string[];
    };
} | {
    name: string;
    description: string;
    inputSchema: {
        type: string;
        properties: {
            entityId: {
                type: string;
                description: string;
            };
            languageCode: {
                type: string;
                description: string;
                enum?: never;
            };
            name?: never;
            email?: never;
            phone?: never;
            address?: never;
            tier?: never;
            status?: never;
            commissionRate?: never;
            id?: never;
            page?: never;
            pageSize?: never;
            code?: never;
            type?: never;
            description?: never;
            isActive?: never;
            currency?: never;
            taxRate?: never;
            entityType?: never;
            fields?: never;
            isRequired?: never;
            isFilterable?: never;
        };
        required: string[];
    };
} | {
    name: string;
    description: string;
    inputSchema: {
        type: string;
        properties: {
            entityId: {
                type: string;
                description: string;
            };
            languageCode: {
                type: string;
                description: string;
                enum?: never;
            };
            fields: {
                type: string;
                description: string;
            };
            name?: never;
            email?: never;
            phone?: never;
            address?: never;
            tier?: never;
            status?: never;
            commissionRate?: never;
            id?: never;
            page?: never;
            pageSize?: never;
            code?: never;
            type?: never;
            description?: never;
            isActive?: never;
            currency?: never;
            taxRate?: never;
            entityType?: never;
            isRequired?: never;
            isFilterable?: never;
        };
        required: string[];
    };
} | {
    name: string;
    description: string;
    inputSchema: {
        type: string;
        properties: {
            name?: never;
            email?: never;
            phone?: never;
            address?: never;
            tier?: never;
            status?: never;
            commissionRate?: never;
            id?: never;
            page?: never;
            pageSize?: never;
            code?: never;
            type?: never;
            description?: never;
            isActive?: never;
            currency?: never;
            taxRate?: never;
            entityType?: never;
            entityId?: never;
            languageCode?: never;
            fields?: never;
            isRequired?: never;
            isFilterable?: never;
        };
        required?: never;
    };
} | {
    name: string;
    description: string;
    inputSchema: {
        type: string;
        properties: {
            name: {
                type: string;
                description: string;
            };
            type: {
                type: string;
                enum: string[];
                description: string;
            };
            isRequired: {
                type: string;
                default: boolean;
                description?: never;
            };
            isFilterable: {
                type: string;
                default: boolean;
            };
            description: {
                type: string;
                description: string;
            };
            email?: never;
            phone?: never;
            address?: never;
            tier?: never;
            status?: never;
            commissionRate?: never;
            id?: never;
            page?: never;
            pageSize?: never;
            code?: never;
            isActive?: never;
            currency?: never;
            taxRate?: never;
            entityType?: never;
            entityId?: never;
            languageCode?: never;
            fields?: never;
        };
        required: string[];
    };
} | {
    name: string;
    description: string;
    inputSchema: {
        type: string;
        properties: {
            type: {
                type: string;
                enum: string[];
                description: string;
            };
            isRequired: {
                type: string;
                description: string;
                default?: never;
            };
            page: {
                type: string;
                default: number;
            };
            pageSize: {
                type: string;
                default: number;
            };
            name?: never;
            email?: never;
            phone?: never;
            address?: never;
            tier?: never;
            status?: never;
            commissionRate?: never;
            id?: never;
            code?: never;
            description?: never;
            isActive?: never;
            currency?: never;
            taxRate?: never;
            entityType?: never;
            entityId?: never;
            languageCode?: never;
            fields?: never;
            isFilterable?: never;
        };
        required?: never;
    };
} | {
    name: string;
    description: string;
    inputSchema: {
        type: string;
        properties: {
            id: {
                type: string;
                description: string;
            };
            name: {
                type: string;
                description: string;
            };
            isRequired: {
                type: string;
                default?: never;
                description?: never;
            };
            isFilterable: {
                type: string;
                default?: never;
            };
            description: {
                type: string;
                description: string;
            };
            email?: never;
            phone?: never;
            address?: never;
            tier?: never;
            status?: never;
            commissionRate?: never;
            page?: never;
            pageSize?: never;
            code?: never;
            type?: never;
            isActive?: never;
            currency?: never;
            taxRate?: never;
            entityType?: never;
            entityId?: never;
            languageCode?: never;
            fields?: never;
        };
        required: string[];
    };
})[];
//# sourceMappingURL=missing-tools.d.ts.map