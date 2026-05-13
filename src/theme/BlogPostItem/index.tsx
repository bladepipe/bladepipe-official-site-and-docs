import React, { useEffect, useState } from 'react';
import type { Props as BlogPostItemProps } from '@theme/BlogPostItem';
import BlogPostItem from '@theme-original/BlogPostItem';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

type Props = BlogPostItemProps & {
  children: React.ReactNode;
};

export default function BlogPostItemWrapper(props: Props): React.JSX.Element {
  const { children, ...blogPostItemProps } = props;
  const [blogImage, setBlogImage] = useState<string>('');
  const [blogImageAlt, setBlogImageAlt] = useState<string>('Blog image');
  const { siteConfig } = useDocusaurusContext();
  const siteBrand = siteConfig.customFields?.siteBrand as string;

  // 直接从 permalinkToDetail 中获取图片信息
  useEffect(() => {
    try {
      const currentPath = window.location.pathname;
      
      // 动态require详细数据 - 根据sitebrand选择不同的路径
      let req;
      if (siteBrand === 'bladepipe') {
        req = (require as any).context('../../../.docusaurus/docusaurus-plugin-content-blog/default', false, /^\.\/site-blog.*\.json$/);
      } else {
        req = (require as any).context('../../../.docusaurus/docusaurus-plugin-content-blog/default', false, /^\.\/site-.*\.json$/);
      }
      
      const permalinkToDetail: Record<string, any> = {};
      req.keys().forEach((key: string) => {
        const detail = req(key);
        if (detail && detail.permalink) {
          permalinkToDetail[detail.permalink] = detail;
        }
      });
      
      // 直接通过当前路径查找详细数据
      const detail = permalinkToDetail[currentPath];
      
      if (detail?.frontMatter?.image) {
        setBlogImage(detail.frontMatter.image);
        setBlogImageAlt(
          detail.frontMatter.image_alt ||
          detail.frontMatter.imageAlt ||
          detail.title ||
          detail.frontMatter.title ||
          'Blog image'
        );
      }
    } catch (error) {
      // Blog images are optional; fall back to the original post rendering.
    }
  }, [siteBrand]);

  // 获取标题元素
  const titleElement = React.Children.toArray(children).find(
    (child: any) => child?.props?.className === 'theme-blog-post-title'
  );

  // 获取其他内容
  const otherElements = React.Children.toArray(children).filter(
    (child: any) => child?.props?.className !== 'theme-blog-post-title'
  );
  return (
    <BlogPostItem {...blogPostItemProps}>
      {titleElement}
      {/* 博客图片区域 - 在标题后显示 */}
      {blogImage && (
        <div className="w-full bg-white py-4 sm:py-6 lg:py-8 flex flex-col items-center mb-4 sm:mb-6 lg:mb-8">
          <div className="w-full max-w-[1320px]">
            <div className="w-full h-[200px] sm:h-[300px] lg:h-[460px] overflow-hidden rounded-xl sm:rounded-2xl">
              <img 
                src={blogImage} 
                alt={blogImageAlt} 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      )}
      {otherElements}
    </BlogPostItem>
  );
} 
