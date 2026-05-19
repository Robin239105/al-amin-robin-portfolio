import React from 'react'
import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiTailwindcss,
  SiGreensock,
  SiFramer,
  SiThreedotjs,
  SiNodedotjs,
  SiExpress,
  SiPython,
  SiGraphql,
  SiWordpress,
  SiPhp,
  SiWoocommerce,
  SiElementor,
  SiMongodb,
  SiPostgresql,
  SiMysql,
  SiRedis,
  SiPrisma,
  SiDocker,
  SiGithubactions,
  SiLinux,
  SiNginx,
  SiVercel,
  SiOpenai,
  SiN8N,
  SiGit,
  SiFigma,
  SiPostman,
  SiMake
} from 'react-icons/si'
import { Cpu, Server, Code, Database } from 'lucide-react'

interface TechIconProps {
  name: string
  className?: string
}

export default function TechIcon({ name, className = "w-5 h-5" }: TechIconProps) {
  // Brand color registry for high-fidelity rendering
  const iconRegistry: Record<string, { component: React.ComponentType<{ className?: string; style?: React.CSSProperties }>; color: string }> = {
    'React': { component: SiReact, color: '#61DAFB' },
    'Next': { component: SiNextdotjs, color: '#FFFFFF' },
    'TS': { component: SiTypescript, color: '#3178C6' },
    'TW': { component: SiTailwindcss, color: '#06B6D4' },
    'GS': { component: SiGreensock, color: '#88CE02' },
    'FM': { component: SiFramer, color: '#F107A3' },
    '3D': { component: SiThreedotjs, color: '#FFFFFF' },
    'NJ': { component: SiNodedotjs, color: '#5FA04E' },
    'EX': { component: SiExpress, color: '#FFFFFF' },
    'PY': { component: SiPython, color: '#3776AB' },
    'GQ': { component: SiGraphql, color: '#E10098' },
    'WP': { component: SiWordpress, color: '#21759B' },
    'PH': { component: SiPhp, color: '#777BB4' },
    'WC': { component: SiWoocommerce, color: '#96588A' },
    'EL': { component: SiElementor, color: '#92003B' },
    'MO': { component: SiMongodb, color: '#47A248' },
    'PG': { component: SiPostgresql, color: '#4169E1' },
    'MY': { component: SiMysql, color: '#4479A1' },
    'RE': { component: SiRedis, color: '#FF4438' },
    'PR': { component: SiPrisma, color: '#2D3748' },
    'DK': { component: SiDocker, color: '#2496ED' },
    'GA': { component: SiGithubactions, color: '#2088FF' },
    'LX': { component: SiLinux, color: '#FCC624' },
    'NG': { component: SiNginx, color: '#009639' },
    'VR': { component: SiVercel, color: '#FFFFFF' },
    'OA': { component: SiOpenai, color: '#412991' },
    'N8': { component: SiN8N, color: '#FF6C37' },
    'GT': { component: SiGit, color: '#F05032' },
    'FG': { component: SiFigma, color: '#F24E1E' },
    'PM': { component: SiPostman, color: '#FF6C37' },
    'MK': { component: SiMake, color: '#EA2127' },
  }

  const lookup = iconRegistry[name]

  if (lookup) {
    const IconComponent = lookup.component
    return (
      <IconComponent 
        className={className} 
        style={{ color: lookup.color }} 
      />
    )
  }

  // Visual custom vector brand fallbacks for libraries not exported in standard simple-icons list
  if (name === 'AW' || name === 'AWS') {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM17.15 16.5C16.89 16.8 16.29 16.92 15.84 16.64C14.15 15.58 12.01 15.34 9.53 15.9C9.02 16.02 8.5 15.69 8.38 15.18C8.26 14.67 8.59 14.15 9.1 14.03C11.83 13.41 14.2 13.7 16.12 14.9C16.57 15.18 16.7 15.77 16.42 16.22C16.66 16.32 16.93 16.4 17.15 16.5ZM18.23 13.56C17.84 14.19 17.02 14.39 16.39 14C14.73 12.98 12.22 12.69 9.38 13.55C8.67 13.77 7.91 13.37 7.69 12.66C7.47 11.95 7.87 11.19 8.58 10.97C11.72 10.02 14.49 10.36 16.39 11.53C17.02 11.91 17.22 12.73 16.84 13.36L18.23 13.56ZM18.36 10.51C15.28 8.68 10.21 8.51 7.28 9.4C6.8 9.55 6.3 9.27 6.15 8.79C6 8.31 6.28 7.81 6.76 7.66C10.13 6.64 15.72 6.83 19.29 8.95C19.72 9.21 19.86 9.77 19.6 10.2C19.34 10.63 18.78 10.77 18.35 10.51L18.36 10.51Z" fill="#FF9900" />
      </svg>
    )
  }

  if (name === 'VS' || name === 'VS Code') {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M23.906 6.096L18.423.473a.855.855 0 00-1.193 0L8.743 8.352 3.633 4.29a.854.854 0 00-1.229.212L.094 8.163a.855.855 0 00.106 1.096l4.636 4.135L.2 17.528a.854.854 0 00-.106 1.097l2.31 3.66a.855.855 0 001.229.213l5.11-4.062 8.487 7.88a.855.855 0 001.193 0l5.483-5.623a.855.855 0 000-1.228L10.372 13.2l13.534-5.875a.854.854 0 000-1.229z" fill="#007ACC" />
      </svg>
    )
  }

  // Developer custom assets
  if (name === 'AP' || name === 'REST APIs') {
    return <Code className={`${className} text-orange-400`} />
  }
  if (name === 'AC' || name === 'ACF Pro') {
    return <Database className={`${className} text-indigo-400`} />
  }
  if (name === 'LC' || name === 'LangChain') {
    return <Cpu className={`${className} text-teal-400`} />
  }

  // Universal fallback icon
  return <Server className={className} />
}
