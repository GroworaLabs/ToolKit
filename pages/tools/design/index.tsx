import type { GetStaticProps } from 'next';
import CategoryPage, { makeCategoryProps } from '@/components/ui/CategoryPage';

export const getStaticProps: GetStaticProps = () => makeCategoryProps('design');
export default CategoryPage;