import { Dispatch, SetStateAction } from 'react';
import { CheckCircle, Lock } from 'phosphor-react';
import { isPast, format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Link, useParams } from 'react-router-dom';

interface LessonProps {
  title: string;
  slug: string;
  availableAt: Date;
  type: 'live' | 'class';
  open?: boolean;
  setIsOpen?: Dispatch<SetStateAction<boolean>>;
}

export function Lesson({ title, slug, availableAt, type, open, setIsOpen }: LessonProps) {

  const { slug: currentSlug } = useParams<{ slug: string }>();

  const isLessonAvailable = isPast(availableAt);
  const availableDateFormatted = format(availableAt, "EEEE' • 'd' de 'MMMM' • 'k'h'mm", {
    locale: ptBR
  });

  const isActiveLesson = slug === currentSlug;

  return (
    <Link
      to={`${isLessonAvailable ? `/event/lesson/${slug}` : ''}`}
      className={`group ${isLessonAvailable ? '' : 'cursor-not-allowed opacity-30'}`}
      onClick={() => {
        setIsOpen && (
          setIsOpen(!open)
        )
        window.scrollTo(0, 0)
      }}
    >
      <span className="text-gray-300 first-letter:uppercase block">
        {availableDateFormatted}
      </span>
      <div
        className={`relative transition-all rounded border border-gray-500 p-4 mt-2
          ${isActiveLesson ? "bg-green-500 border-green-500 before:absolute before:opacity-0 before:bg-green-500 before:rounded-sm before:w-[15px] before:h-[15px] before:animate-arrowFadeInLeft before:delay-300 before:rotate-45 before:left-[5px] before:bottom-[50%] before:translate-y-[50%]" : ''}
          ${isLessonAvailable ? 'group-hover:border-green-500' : ''}
        `}>
        <header className="flex items-center justify-between gap-2">
          {isLessonAvailable ? (
            <span className={
              `text-sm font-medium flex items-center gap-2
                ${isActiveLesson ? 'text-white' : 'text-blue-500 '}
              `
            }>
              <CheckCircle size={20} />
              Conteúdo liberado
            </span>
          ) : (
            <span className="text-sm text-orange-500 font-medium flex items-center gap-2">
              <Lock size={20} />
              Em breve
            </span>
          )}
          <span className={`
          font-bold text-xs rounded px-2 py-[0.125rem] text-white border 
            ${isActiveLesson ? 'border-white' : 'border-green-300'}
          `}>
            {type === 'live' ? 'AO VIVO' : 'AULA PRÁTICA'}
          </span>
        </header>
        <strong className={`
           mt-5 block
          ${isActiveLesson ? 'text-white' : 'text-gray-200'}
        `}>
          {title}
        </strong>
      </div>
    </Link >
  )
}