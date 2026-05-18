import type { GetStaticProps } from 'next';
import CategoryPage, { makeCategoryProps } from '@/components/ui/CategoryPage';

export const getStaticProps: GetStaticProps = () => makeCategoryProps('network-web');
export default CategoryPage;
