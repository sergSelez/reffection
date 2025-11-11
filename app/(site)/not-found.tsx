// import { Link } from 'react-router-dom';
// import '../components/Custom404/styles/Custom404.scss';
// import { Helmet } from 'react-helmet';

import Link from "next/link";

function Custom404() {
   return (
      <>
         <section className="error_page">
            <div className="container">
               <div className="error_page_wrap">
                  <h1 className="error_page_wrap-title">404</h1>
                  <div className="error_page_wrap-text typ_text onest">
                     <p>
                        Мы не можем найти страницу, которую вы искали. Возможно, она была удалена, переехала или никогда не существовала.
                     </p>
                  </div>
                  <Link href={"/"} className="error_page_wrap-link btn gray light_gray">на главную</Link>
               </div>
            </div>
         </section>

      </>
   );
}

export default Custom404;