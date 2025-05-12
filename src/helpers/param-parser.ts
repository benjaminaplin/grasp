import { Request } from "express";

type QueryParams = {
  page: number;
  limit: number;
  offset: number;
  sort: string;
  order: 'asc' | 'desc';
  filters: Record<string, string>;
};

const ALLOWED_SORT_FIELDS = ['created_at', 'title', 'scheduledDate', 'type'];
const ALLOWED_FILTER_FIELDS = ['userId', 'type', 'status'];
const DEFAULT_SORT = 'created_at';
const DEFAULT_ORDER: 'asc' | 'desc' = 'desc';
type Query = Request['query'] & { page: string, limit: string }

export function parseQueryParams(query: any): QueryParams {
  const page = Math.max(parseInt(query.page) || 1, 1);
  const limit = Math.min(Math.max(parseInt(query.limit) || 20, 1), 100);

  const rawSort = (query.sort || DEFAULT_SORT).toString();
  const sort = ALLOWED_SORT_FIELDS.includes(rawSort) ? rawSort : DEFAULT_SORT;

  const rawOrder = (query.order || DEFAULT_ORDER).toString().toLowerCase();
  const order: 'asc' | 'desc' = rawOrder === 'asc' ? 'asc' : 'desc';
  const offset = (page - 1) * limit;
  // Extract known filters (extend as needed)
  const filters: Record<string, string> = {};
  ALLOWED_FILTER_FIELDS.forEach((key) => {
    if (query[key]) {
      filters[key] = query[key]
    };
  });

  return { page, limit, sort, order, filters, offset};
}