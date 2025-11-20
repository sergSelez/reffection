'use client';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import LandingHead from '../Landing/LandingHead/LandingHead';
import ProductPageWhyNeed from '../ProductPage/ProductPageWhyNeed/ProductPageWhyNeed';
import LandingProducts from '../Landing/LandingProducts/LandingProducts';
import ReviewsClients from '../FrontPage/ReviewsClients/ReviewsClients';
// import { Helmet } from 'react-helmet';
import ReviewsKitchens from '../FrontPage/Reviews/ReviewsKitchens';
import ReviewsBlockquote from '../FrontPage/Reviews/ReviewsBlockquote.jsx/ReviewsBlockquote';
import ProductPageDirect from '../ProductPage/ProductPageDirect/ProductPageDirect';
import ServicePageFaq from '../ServicePage/ServicePageFaq/ServicePageFaq';
import LandingKitchenRight from '../Landing/LandingKitchenHeadRight/LandingKitchenHeadRight';
import data from '../assets/dataPages/landingKitchensData.json';
import LandingKitchensSales from '../Landing/LandingKitchensSales/LandingKitchensSales';
import LandingReadySalesKitchens from '../Landing/LandingReadySales/LandingReadySalesKitchens/LandingReadySalesKitchens';
import KitchensGetBlock from '../Landing/KitchensGetBlock/KitchensGetBlock';

gsap.registerPlugin(ScrollTrigger);

function Kitchens() {
  const wrapSection = useRef(null);

  const ymReachGoalHeadClickName = 'klik_zayavka_kuhni';
  const ymReachGoalHeadSubmitName = 'otpr_zayavka_kuhni';

  const ymReachGoalFooterClickName = 'klik_kons_kuhni';
  const ymReachGoalFooterSubmitName = 'otpr_kons_kuhni';

  useEffect(() => {
    const allSection = wrapSection.current.querySelectorAll('section');
    allSection.forEach((item, index) => {
      if (index !== 0) {
        gsap.set(item, {
          opacity: 0,
          y: 50,
        });
        ScrollTrigger.create({
          trigger: item,
          start: 'top bottom',
          end: 'bottom bottom',
          onEnter: () => {
            gsap.to(item, {
              opacity: 1,
              y: 0,
              duration: 0.6,
              onComplete: () => {
                item.style.transform = '';
              },
            });
          },
        });
      }
    });
  }, []);

  return (
    <>
      {/* <Helmet>
        <title>Лидогенерация для кухонь и мебели на заказ | Reffection</title>
        <meta name="title" content="Лидогенерация для кухонь и мебели на заказ | Reffection" />
        <meta
          name="description"
          content="Приводим горячих клиентов, готовых заказать кухню — на основе поведения в интернете и скоринга по целевым сегментам."
        />

        <link rel="canonical" href="https://reffection.ru/kitchens" /> */}

      {/* Open Graph */}
      {/* <meta property="og:type" content="website" />
        <meta property="og:url" content="https://reffection.ru/kitchens" />
        <meta property="og:title" content="Лидогенерация для кухонь и мебели на заказ | Reffection" />
        <meta
          property="og:description"
          content="Приводим горячих клиентов, готовых заказать кухню — на основе поведения в интернете и скоринга по целевым сегментам."
        /> */}

      {/* Twitter */}
      {/* <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://reffection.ru/kitchens" />
        <meta property="twitter:title" content="Лидогенерация для кухонь и мебели на заказ | Reffection" />
        <meta
          property="twitter:description"
          content="Приводим горячих клиентов, готовых заказать кухню — на основе поведения в интернете и скоринга по целевым сегментам."
        />
      </Helmet> */}

      <div className="landing_page" ref={wrapSection}>
        <section className="landing_page_head kitchens">
          <div className="container">
            <div className="landing_page_head_wrap">
              <LandingHead
                content={data?.headContent}
                ymReachGoalClickName={ymReachGoalHeadClickName}
                ymReachGoalSubmitName={ymReachGoalHeadSubmitName}
              />
              <LandingKitchenRight />
            </div>
          </div>
        </section>
        <div className="container">
          <ProductPageWhyNeed content={data?.contentWhyNeed} />
        </div>
        <LandingKitchensSales />
        <LandingProducts
          dataProduct={data.dataProduct}
          className={'kitchens'}
          sectionTitle={'Инструменты лидогенерации, <br> которые мы используем'}
        />
        <ReviewsKitchens className={'kitchens'} />
        <ReviewsBlockquote content={data.ReviewsBlockquote} className={'kitchens'} />
        <div className="container">
          <ProductPageDirect
            content={data.contentDirect}
            className={'kitchens'}
            sectionTitle="Кому подойдёт наше решение"
          />
        </div>
        <KitchensGetBlock content={data.youGet} />
        <ReviewsClients dataReviews={data?.reviewsClient} className={'kitchens'} titleSection={'Отзыв клиента'} />
        <div className="container">
          <ServicePageFaq data={data} />
        </div>
        <LandingReadySalesKitchens
          image={data.readySales.images}
          className={'kitchens'}
          ymReachGoalClickName={ymReachGoalFooterClickName}
          ymReachGoalSubmitName={ymReachGoalFooterSubmitName}
        />
      </div>
    </>
  );
}

export default Kitchens;
