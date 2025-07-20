import React from "react";
import { Route, Routes} from "react-router-dom";
import withRouter from "../hooks/withRouter"
import { Home } from "../pages/home";
import { ImgBased } from "../pages/ImgBased";
import { Questioniar } from "../pages/Questioniar";

import { Socialicons } from "../components/socialicons";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import SnakeDescribe from './../pages/SnakeDescribe/SnakeDescribe';
import SymptomDescribe from "../pages/SymptomDescribe/SymptomDescribe";
import BlogApp from "../pages/Blog/Blog";
import AboutPage from "../pages/about"

const AnimatedRoutes = withRouter(({ location }) => (
  <TransitionGroup>
    <CSSTransition
      key={location.key}
      timeout={{
        enter: 400,
        exit: 400,
      }}
      classNames="page"
      unmountOnExit
    >
      <Routes location={location}>
        <Route exact path="/" element={<Home />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/ImgBased" element={<ImgBased />} />
        <Route path="/blog" element={<BlogApp/>} />
        <Route path="/Questioniar" element={<Questioniar />} />
        <Route path="/symptomDescribe" element={<SymptomDescribe />} />


        <Route path="/snakeDescribe" element={<SnakeDescribe />} />
        

        <Route path="*" element={<Home />} />
      </Routes>
    </CSSTransition>
  </TransitionGroup>
));

function AppRoutes() {
  return (
    <div className="s_c">
      <AnimatedRoutes />
      <Socialicons />
    </div>
  );
}

export default AppRoutes;
