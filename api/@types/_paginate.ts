import { Schema, Document } from "mongoose";

export interface QueryResult {
    results: Document[];
    page: number;
    limit: number;
    totalPages: number;
    totalResults: number;
}

export interface IOptions {
    sortBy?: string;
    projectBy?: string;
    populate?: string;
    limit?: number;
    page?: number;
  }
  
  const paginate = <T extends Document>(schema: Schema<T>): void => {
    schema.static('paginate', async function (filter: Record<string, any>, options: IOptions): Promise<QueryResult> {
      let sort: string = '';
      if (options.sortBy) {
        const sortingCriteria: any = [];
        options.sortBy.split(',').forEach((sortOption: string) => {
          const [key, order] = sortOption.split(':');
          sortingCriteria.push((order === 'desc' ? '-' : '') + key);
        });
        sort = sortingCriteria.join(' ');
      } else {
        sort = 'createdAt';
      }
  
      let project: string = '';
      if (options.projectBy) {
        const projectionCriteria: string[] = [];
        options.projectBy.split(',').forEach((projectOption) => {
          const [key, include] = projectOption.split(':');
          projectionCriteria.push((include === 'hide' ? '-' : '') + key);
        });
        project = projectionCriteria.join(' ');
      } else {
        project = '-createdAt -updatedAt';
      }
  
      const limit = options.limit && parseInt(options.limit.toString(), 10) > 0 ? parseInt(options.limit.toString(), 10) : 10;
      const page = options.page && parseInt(options.page.toString(), 10) > 0 ? parseInt(options.page.toString(), 10) : 1;
      const skip = (page - 1) * limit;
  
      const countPromise = this.countDocuments(filter).exec();
      let docsPromise = this.find(filter).sort(sort).skip(skip).limit(limit).select(project);
  
      if (options.populate) {
        options.populate.split(',').forEach((populateOption: any) => {
          docsPromise = docsPromise.populate(
            populateOption
              .split('.')
              .reverse()
              .reduce((a: string, b: string) => ({ path: b, populate: a }))
          );
        });
      }
  
      docsPromise = docsPromise.exec();
  
      return Promise.all([countPromise, docsPromise]).then((values) => {
        const [totalResults, results] = values;
        const totalPages = Math.ceil(totalResults / limit);
        const result = {
          results,
          page,
          limit,
          totalPages,
          totalResults,
        };
        return Promise.resolve(result);
      });
    });
};

export default paginate;