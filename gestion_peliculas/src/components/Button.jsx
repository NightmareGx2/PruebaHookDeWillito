import PropTypes from 'prop-types';

/**
 * Componente Button - Botón reutilizable con múltiples variantes y estados
 * @param {Object} props - Propiedades del componente
 * @param {string} props.text - Texto del botón
 * @param {string} props.type - Tipo del botón (button, submit, reset)
 * @param {string} props.variant - Variante del estilo (primary, secondary, success, danger, warning, info, outline)
 * @param {string} props.size - Tamaño del botón (xs, sm, md, lg, xl)
 * @param {boolean} props.disabled - Si el botón está deshabilitado
 * @param {boolean} props.loading - Si el botón está en estado de carga
 * @param {boolean} props.fullWidth - Si el botón debe ocupar todo el ancho disponible
 * @param {Function} props.onClick - Función a ejecutar al hacer clic
 * @param {string} props.className - Clases CSS adicionales
 * @param {React.ReactNode} props.icon - Icono del botón
 * @param {string} props.iconPosition - Posición del icono (left, right)
 */
const Button = ({
  text,
  type = 'button',
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  fullWidth = false,
  onClick,
  className = '',
  icon,
  iconPosition = 'left',
  ...props
}) => {
  // Estilos base
  const baseStyles = 'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';

  // Esti