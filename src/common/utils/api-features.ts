export class ApiFeatures<T = any> {
    private query: any;
    private prismaModel: any;
    private options: any = {};
  
    constructor(prismaModel: any, reqQuery: any) {
      this.prismaModel = prismaModel;
      this.query = reqQuery;
      this.options.where = {};
    }
  
    search(fields: string[]) {
      if (this.query.search) {
        this.options.where.OR = fields.map((f) => ({
          [f]: { contains: this.query.search, mode: 'insensitive' },
        }));
      }
      return this;
    }
  
    filter(allowedFields: string[]) {
      allowedFields.forEach((field) => {
        if (this.query[field]) {
          this.options.where[field] = this.query[field];
        }
      });
      return this;
    }
  
    paginate(defaultPage = 1, defaultPageSize = 10) {
      const page = Number(this.query.page) || defaultPage;
      const pageSize = Number(this.query.pageSize) || defaultPageSize;
      this.options.skip = (page - 1) * pageSize;
      this.options.take = pageSize;
      this.options.page = page;
      this.options.pageSize = pageSize;
      return this;
    }
  
    sort(defaultSort = { createdAt: 'desc' }) {
      if (this.query.sortBy && this.query.sortOrder) {
        this.options.orderBy = {
          [this.query.sortBy]: this.query.sortOrder,
        };
      } else {
        this.options.orderBy = defaultSort;
      }
      return this;
    }
  
    async execWithCount() {
      // لازم تحسب total separately لأن skip/take يأثروا على count
      const total = await this.prismaModel.count({
        where: this.options.where,
      });
      const data = await this.prismaModel.findMany({
        where: this.options.where,
        skip: this.options.skip,
        take: this.options.take,
        orderBy: this.options.orderBy,
        include: this.options.include, // لو محتاج include relations
      });
      const totalPages = Math.ceil(total / this.options.pageSize);
      return {
        data,
        pagination: {
          total,
          page: this.options.page,
          pageSize: this.options.pageSize,
          totalPages,
          hasNext: this.options.page < totalPages,
        },
      };
    }
  
    // للسماح بتمرير include relations من الخدمة
    setInclude(include: any) {
      this.options.include = include;
      return this;
    }
  }
  