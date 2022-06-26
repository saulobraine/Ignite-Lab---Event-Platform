import { Dispatch, SetStateAction } from "react";
import { useGetLessonsQuery } from "../graphql/generated";
import { Lesson } from "./Lesson";

interface SidebarProps {
  className?: string;
  open?: boolean;
  setIsOpen?: Dispatch<SetStateAction<boolean>>;
}

export function Sidebar({ className, open, setIsOpen }: SidebarProps) {

  const { data } = useGetLessonsQuery();

  return (
    <aside className={`w-[385px] bg-gray-700 p-6 border-l border-gray-500 ${className}`}>
      <span className="font-bold text-2xl pb-6 mb-6 border-b border-gray-500 block">
        Cronograma das aulas
      </span>

      <div className="flex flex-col gap-8">
        {data?.lessons.map(lesson => {
          return (
            <Lesson
              key={lesson.id}
              title={lesson.title}
              slug={lesson.slug}
              availableAt={new Date(lesson.availableAt)}
              type={lesson.lessonType}
              setIsOpen={setIsOpen}
              open={open}
            />
          )
        })}

      </div>
    </aside>
  )
}