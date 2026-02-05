export const Card = ({ children, className }) => (
  <div className={`rounded-xl bg-white ${className}`}>
    {children}
  </div>
);

export const CardContent = ({ children, className }) => (
  <div className={`p-6 ${className}`}>
    {children}
  </div>
);