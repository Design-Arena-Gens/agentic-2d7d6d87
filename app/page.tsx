"use client";

import { useMemo, useState } from "react";
import type { TrainingPlan, FitnessGoal, FitnessLevel, EquipmentAccess } from "@/lib/plan";
import { generateTrainingPlan } from "@/lib/plan";

const goalOptions: { value: FitnessGoal; label: string }[] = [
  { value: "fat-loss", label: "Снижение веса" },
  { value: "strength", label: "Сила" },
  { value: "hypertrophy", label: "Гипертрофия" },
  { value: "endurance", label: "Выносливость" },
  { value: "mobility", label: "Мобильность" }
];

const levelOptions: { value: FitnessLevel; label: string }[] = [
  { value: "beginner", label: "Новичок" },
  { value: "intermediate", label: "Средний" },
  { value: "advanced", label: "Продвинутый" }
];

const equipmentOptions: { value: EquipmentAccess; label: string }[] = [
  { value: "minimal", label: "Минимум (дом без оборудования)" },
  { value: "basic", label: "Базовый набор (гантели/резинки)" },
  { value: "full", label: "Полноценный тренажёрный зал" }
];

const focusOptions = [
  "Грудь",
  "Спина",
  "Ноги",
  "Кор",
  "Кардио",
  "Плечи",
  "Ягодицы",
  "Подвижность"
];

const defaultPreferences = {
  goal: "strength" as FitnessGoal,
  level: "intermediate" as FitnessLevel,
  daysPerWeek: 4,
  sessionLength: 60,
  equipment: "basic" as EquipmentAccess,
  focusAreas: ["Спина", "Ноги", "Кор"]
};

export default function Page() {
  const [preferences, setPreferences] = useState(defaultPreferences);
  const [showDetails, setShowDetails] = useState(false);

  const plan: TrainingPlan = useMemo(() => generateTrainingPlan(preferences), [preferences]);

  return (
    <main className="max-w-6xl mx-auto px-4 py-10">
      <header className="mb-10 text-center">
        <h1 className="text-4xl font-bold text-white mb-4">Персональный план тренировок</h1>
        <p className="text-slate-300">
          Сформируйте структурированный план на 6 недель под ваши цели, уровень и доступное оборудование.
        </p>
      </header>

      <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)]">
        <section className="bg-slate-900/70 border border-slate-800 rounded-3xl p-6 shadow-xl">
          <h2 className="text-xl font-semibold text-white mb-4">Настройки</h2>
          <form className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Цель</label>
              <select
                value={preferences.goal}
                onChange={(event) =>
                  setPreferences((prev) => ({
                    ...prev,
                    goal: event.target.value as FitnessGoal
                  }))
                }
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-slate-100 focus:outline-none focus:ring-2 focus:ring-primary"
              >
                {goalOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Уровень подготовки</label>
              <select
                value={preferences.level}
                onChange={(event) =>
                  setPreferences((prev) => ({
                    ...prev,
                    level: event.target.value as FitnessLevel
                  }))
                }
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-slate-100 focus:outline-none focus:ring-2 focus:ring-primary"
              >
                {levelOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Тренировок в неделю</label>
              <input
                type="range"
                min={2}
                max={6}
                value={preferences.daysPerWeek}
                onChange={(event) =>
                  setPreferences((prev) => ({
                    ...prev,
                    daysPerWeek: Number(event.target.value)
                  }))
                }
                className="w-full accent-primary"
              />
              <div className="flex justify-between text-xs text-slate-500">
                <span>2</span>
                <span>6</span>
              </div>
              <p className="mt-1 text-sm text-primary">{preferences.daysPerWeek} тренировок</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Продолжительность (мин)</label>
              <input
                type="number"
                min={30}
                max={90}
                step={5}
                value={preferences.sessionLength}
                onChange={(event) =>
                  setPreferences((prev) => ({
                    ...prev,
                    sessionLength: Number(event.target.value)
                  }))
                }
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-slate-100 focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Оборудование</label>
              <select
                value={preferences.equipment}
                onChange={(event) =>
                  setPreferences((prev) => ({
                    ...prev,
                    equipment: event.target.value as EquipmentAccess
                  }))
                }
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-slate-100 focus:outline-none focus:ring-2 focus:ring-primary"
              >
                {equipmentOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            <fieldset>
              <legend className="block text-sm font-medium text-slate-300 mb-2">Приоритетные зоны</legend>
              <div className="grid grid-cols-2 gap-2">
                {focusOptions.map((option) => {
                  const checked = preferences.focusAreas.includes(option);
                  return (
                    <label
                      key={option}
                      className={`flex items-center gap-2 rounded-xl border px-3 py-2 text-sm transition ${
                        checked ? "border-primary bg-primary/10 text-white" : "border-slate-700 text-slate-300"
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={() => {
                          setPreferences((prev) => {
                            if (checked) {
                              return {
                                ...prev,
                                focusAreas: prev.focusAreas.filter((item) => item !== option)
                              };
                            }
                            return {
                              ...prev,
                              focusAreas: [...prev.focusAreas, option]
                            };
                          });
                        }}
                        className="accent-primary"
                      />
                      {option}
                    </label>
                  );
                })}
              </div>
              <p className="mt-2 text-xs text-slate-500">Выберите до 3 направлений. Если ничего не выбрано, план будет сбалансированным.</p>
            </fieldset>

            <button
              type="button"
              onClick={() => setShowDetails((prev) => !prev)}
              className="w-full bg-primary text-white font-semibold rounded-xl py-3 transition hover:bg-primary-light"
            >
              {showDetails ? "Скрыть детали" : "Показать детали плана"}
            </button>
          </form>
        </section>

        <section className="space-y-6">
          <article className="bg-gradient-to-br from-primary/30 via-slate-900/80 to-slate-900 border border-primary/40 rounded-3xl p-6 shadow-2xl">
            <h2 className="text-2xl font-semibold mb-4 text-white">Итоговый план</h2>
            <p className="text-slate-200 leading-relaxed mb-4">{plan.summary}</p>
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="bg-slate-900/60 rounded-2xl p-4 border border-slate-800">
                <h3 className="text-sm uppercase tracking-wide text-slate-400 mb-2">Фокус микроциклов</h3>
                <ul className="space-y-1 text-slate-200 text-sm">
                  {plan.microcycleFocus.map((item) => (
                    <li key={item}>• {item}</li>
                  ))}
                </ul>
              </div>
              <div className="bg-slate-900/60 rounded-2xl p-4 border border-slate-800">
                <h3 className="text-sm uppercase tracking-wide text-slate-400 mb-2">Контроль прогресса</h3>
                <ul className="space-y-1 text-slate-200 text-sm">
                  {plan.monitoringTips.map((item) => (
                    <li key={item}>• {item}</li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="mt-4 bg-slate-900/60 rounded-2xl p-4 border border-slate-800">
              <h3 className="text-sm uppercase tracking-wide text-slate-400 mb-2">Питание</h3>
              <p className="text-slate-200 text-sm leading-relaxed">{plan.nutritionNotes}</p>
            </div>
          </article>

          <div className="grid gap-4 md:grid-cols-2">
            {plan.days.map((training) => (
              <article
                key={training.day}
                className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 flex flex-col gap-3"
              >
                <header>
                  <p className="text-xs uppercase tracking-wide text-primary">{training.day}</p>
                  <h3 className="text-lg font-semibold text-white">Фокус: {training.focus}</h3>
                </header>

                <div>
                  <h4 className="text-sm font-semibold text-slate-300 mb-1">Разминка</h4>
                  <ul className="text-sm text-slate-200 space-y-1">
                    {training.warmup.map((item) => (
                      <li key={item}>• {item}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="text-sm font-semibold text-slate-300 mb-1">Основная часть</h4>
                  <div className="space-y-3">
                    {training.main.map((block) => (
                      <div key={block.title} className="bg-slate-950/60 border border-slate-800 rounded-xl p-3">
                        <div className="flex justify-between items-center text-sm text-slate-400">
                          <span>{block.title}</span>
                          <span>{block.duration} мин · {block.intensity}</span>
                        </div>
                        <ul className="mt-2 text-sm text-slate-200 space-y-1">
                          {block.exercises.map((exercise) => (
                            <li key={exercise}>• {exercise}</li>
                          ))}
                        </ul>
                        {block.notes ? (
                          <p className="mt-2 text-xs text-primary/80">{block.notes}</p>
                        ) : null}
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-semibold text-slate-300 mb-1">Заминка</h4>
                  <ul className="text-sm text-slate-200 space-y-1">
                    {training.cooldown.map((item) => (
                      <li key={item}>• {item}</li>
                    ))}
                  </ul>
                </div>

                <footer className="mt-auto text-xs text-slate-400">
                  {training.tips}
                </footer>
              </article>
            ))}
          </div>

          {showDetails ? (
            <article className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 space-y-4">
              <h2 className="text-xl font-semibold text-white">Рекомендации по восстановлению</h2>
              <ul className="text-slate-200 text-sm space-y-2">
                {plan.recoveryNotes.map((item) => (
                  <li key={item}>• {item}</li>
                ))}
              </ul>
              <div className="text-xs text-slate-500">
                План рассчитан на 6 недель. Каждые 2 недели анализируйте самочувствие и при необходимости корректируйте нагрузку.
              </div>
            </article>
          ) : null}
        </section>
      </div>
    </main>
  );
}
