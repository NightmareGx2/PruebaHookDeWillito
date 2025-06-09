import PropTypes from 'prop-types';

/**
 * Componente Titulo - Renderiza títulos con estilos consistentes
 * @param {Object} props - Propiedades del componente
 * @param {string} props.text - Texto del título
 * @param {string} props.level - Nivel del título (h1, h2, h3, h4, h5, h6)
 * @param {string} props.className - Clases CSS adicionales
 * @param {string} props.variant - Variante del estilo (primary, secondary, dark, light)
 * @param {boolean} props.center - Si el título debe estar centrado
 */
const Titulo = ({ 
  text, 
  level = 'h1', 
  className = '', 
  variant = 'primary',
  center = false 
}) => {
  const levelStyles = {
    h1: 'text-4xl md:text-5xl font-bold',
    h2: 'text-3xl md:text-4xl font-bold',
    h3: 'text-2xl md:text-3xl font-semibold',
    h4: 'text-xl md:text-2xl font-semibold',
    h5: 'text-lg md:text-xl font-medium',
    h6: 'text-base md:text-lg font-medium',
  };

  const variantStyles = {
    primary: 'text-gray-900',
    secondary: 'text-gray-700',
    dark: 'text-gray-800',
    light: 'text-gray-600',
    success: 'text-green-700',
    warning: 'text-yellow-700',
    danger: 'text-red-700',
  };

  const Component = level;

  const combinedClassName = [
    levelStyles[level],
    variantStyles[variant],
    center ? 'text-center' : '',
    'transition-colors duration-200',
    className
  ].filter(Boolean).join(' ');

  return (
    <Component className={combinedClassName}>
      {text}
    </Component>
  );
};

Titulo.propTypes = {
  text: PropTypes.string.isRequired,
  level: PropTypes.oneOf(['h1', 'h2', 'h3', 'h4', 'h5', 'h6']),
  className: PropTypes.string,
  variant: PropTypes.oneOf(['primary', 'secondary', 'dark', 'light', 'success', 'warning', 'danger']),
  center: PropTypes.bool,
};

export default Titulo;
