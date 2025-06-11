import React from 'react';

const SectionWrapper = React.forwardRef(({ id, children, className = '' }, ref) => (
  <section ref={ref} id={id} className={className + ' section-padding'}>
    {children}
  </section>
));

export default SectionWrapper;
