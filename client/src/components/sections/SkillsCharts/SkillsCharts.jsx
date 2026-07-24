import { useEffect, useMemo, useState } from 'react';
import ReactECharts from 'echarts-for-react';
import * as echarts from 'echarts';
import 'echarts-gl';
import { useTheme } from '../../../context/ThemeContext';
import './SkillsCharts.css';

const CATEGORY_ORDER = [
  'Languages',
  'Frontend',
  'Backend',
  'Databases',
  'API & Technologies',
  'Tools & Platforms',
];

function readCssVar(name, fallback) {
  if (typeof window === 'undefined') return fallback;
  const value = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  return value || fallback;
}

export default function SkillsCharts({ skills }) {
  const { theme } = useTheme();
  const [view, setView] = useState('3d-skills');
  const [activeCategory, setActiveCategory] = useState('All');
  const [palette, setPalette] = useState({
    text: '#f2ebe0',
    muted: '#9aa3b5',
    accent: '#c4a574',
    accent2: '#6eb5ad',
    soft: '#151c29',
    bg: '#0b1018',
  });

  useEffect(() => {
    setPalette({
      text: readCssVar('--text', '#f2ebe0'),
      muted: readCssVar('--text-muted', '#9aa3b5'),
      accent: readCssVar('--accent', '#c4a574'),
      accent2: readCssVar('--accent-2', '#6eb5ad'),
      soft: readCssVar('--bg-soft', '#151c29'),
      bg: readCssVar('--bg', '#0b1018'),
    });
  }, [theme]);

  const categories = useMemo(() => {
    const set = new Set(skills.map((s) => s.category || 'Other'));
    return ['All', ...CATEGORY_ORDER.filter((c) => set.has(c)), ...[...set].filter((c) => !CATEGORY_ORDER.includes(c))];
  }, [skills]);

  const filteredSkills = useMemo(() => {
    const list =
      activeCategory === 'All'
        ? [...skills]
        : skills.filter((s) => s.category === activeCategory);
    return list.sort((a, b) => (b.level || 0) - (a.level || 0));
  }, [skills, activeCategory]);

  const categoryAverages = useMemo(() => {
    const map = {};
    skills.forEach((skill) => {
      const key = skill.category || 'Other';
      if (!map[key]) map[key] = [];
      map[key].push(skill.level || 0);
    });
    return Object.entries(map).map(([name, levels]) => ({
      name,
      value: Math.round(levels.reduce((a, b) => a + b, 0) / levels.length),
    }));
  }, [skills]);

  const skills3DOption = useMemo(() => {
    const names = filteredSkills.map((s) => s.name);
    const data = filteredSkills.map((s, i) => [i, 0, s.level || 0, s.name, s.category]);

    return {
      backgroundColor: 'transparent',
      tooltip: {
        formatter: (params) => {
          const [, , value, name, category] = params.value;
          return `<strong>${name}</strong><br/>${category}<br/>Proficiency: ${value}%`;
        },
      },
      visualMap: {
        show: true,
        min: 60,
        max: 100,
        dimension: 2,
        orient: 'horizontal',
        left: 'center',
        bottom: 8,
        textStyle: { color: palette.muted, fontSize: 11 },
        inRange: {
          color: [palette.accent, palette.accent2],
        },
      },
      xAxis3D: {
        type: 'category',
        data: names,
        name: 'Skills',
        nameTextStyle: { color: palette.muted },
        axisLabel: {
          color: palette.muted,
          interval: 0,
          rotate: 35,
          fontSize: 10,
          formatter: (value) => (value.length > 14 ? `${value.slice(0, 12)}…` : value),
        },
        axisLine: { lineStyle: { color: palette.muted } },
      },
      yAxis3D: {
        type: 'category',
        data: ['Level'],
        axisLabel: { show: false },
        axisLine: { lineStyle: { color: palette.muted } },
      },
      zAxis3D: {
        type: 'value',
        max: 100,
        name: '%',
        nameTextStyle: { color: palette.muted },
        axisLabel: { color: palette.muted },
        axisLine: { lineStyle: { color: palette.muted } },
        splitLine: { lineStyle: { color: palette.soft } },
      },
      grid3D: {
        boxWidth: Math.min(280, 40 + names.length * 18),
        boxDepth: 36,
        boxHeight: 120,
        environment: 'none',
        axisPointer: { show: true, lineStyle: { color: palette.accent } },
        viewControl: {
          projection: 'perspective',
          autoRotate: true,
          autoRotateSpeed: 6,
          autoRotateAfterStill: 2,
          distance: names.length > 10 ? 220 : 180,
          alpha: 24,
          beta: 35,
          minDistance: 120,
          maxDistance: 320,
        },
        light: {
          main: { intensity: 1.25, shadow: true, shadowQuality: 'medium' },
          ambient: { intensity: 0.45 },
        },
      },
      series: [
        {
          type: 'bar3D',
          name: 'Proficiency',
          data,
          shading: 'lambert',
          bevelSize: 0.25,
          bevelSmoothness: 4,
          itemStyle: {
            opacity: 0.95,
          },
          emphasis: {
            itemStyle: { color: palette.accent },
            label: {
              show: true,
              formatter: ({ value }) => `${value[2]}%`,
              color: palette.text,
            },
          },
        },
      ],
    };
  }, [filteredSkills, palette]);

  const category3DOption = useMemo(() => {
    const names = categoryAverages.map((c) => c.name);
    const data = categoryAverages.map((c, i) => [i, 0, c.value, c.name]);

    return {
      backgroundColor: 'transparent',
      tooltip: {
        formatter: (params) => {
          const [, , value, name] = params.value;
          return `<strong>${name}</strong><br/>Avg proficiency: ${value}%`;
        },
      },
      visualMap: {
        show: false,
        min: 60,
        max: 100,
        inRange: { color: [palette.accent, palette.accent2] },
      },
      xAxis3D: {
        type: 'category',
        data: names,
        axisLabel: {
          color: palette.muted,
          interval: 0,
          rotate: 25,
          fontSize: 11,
          formatter: (value) => (value.length > 16 ? `${value.slice(0, 14)}…` : value),
        },
        axisLine: { lineStyle: { color: palette.muted } },
      },
      yAxis3D: {
        type: 'category',
        data: ['Avg'],
        axisLabel: { show: false },
        axisLine: { lineStyle: { color: palette.muted } },
      },
      zAxis3D: {
        type: 'value',
        max: 100,
        axisLabel: { color: palette.muted },
        axisLine: { lineStyle: { color: palette.muted } },
      },
      grid3D: {
        boxWidth: 200,
        boxDepth: 40,
        boxHeight: 120,
        environment: 'none',
        viewControl: {
          projection: 'perspective',
          autoRotate: true,
          autoRotateSpeed: 5,
          distance: 170,
          alpha: 22,
          beta: 40,
        },
        light: {
          main: { intensity: 1.2, shadow: true },
          ambient: { intensity: 0.4 },
        },
      },
      series: [
        {
          type: 'bar3D',
          data,
          shading: 'realistic',
          bevelSize: 0.35,
          itemStyle: { opacity: 0.96 },
          emphasis: {
            label: {
              show: true,
              formatter: ({ value }) => `${value[2]}%`,
              color: palette.text,
            },
          },
        },
      ],
    };
  }, [categoryAverages, palette]);

  const radarOption = useMemo(() => {
    const indicators = categoryAverages.map((c) => ({
      name: c.name.replace(' & ', '\n& '),
      max: 100,
    }));
    const values = categoryAverages.map((c) => c.value);

    return {
      backgroundColor: 'transparent',
      tooltip: { trigger: 'item' },
      radar: {
        indicator: indicators,
        center: ['50%', '52%'],
        radius: '62%',
        axisName: {
          color: palette.muted,
          fontSize: 11,
        },
        splitArea: {
          areaStyle: {
            color: [palette.soft, 'transparent'],
          },
        },
        axisLine: { lineStyle: { color: palette.muted } },
        splitLine: { lineStyle: { color: palette.muted } },
      },
      series: [
        {
          type: 'radar',
          data: [
            {
              value: values,
              name: 'Category average',
              areaStyle: {
                color: new echarts.graphic.RadialGradient(0.5, 0.5, 1, [
                  { offset: 0, color: `${palette.accent}88` },
                  { offset: 1, color: `${palette.accent2}22` },
                ]),
              },
              lineStyle: { color: palette.accent, width: 2 },
              itemStyle: { color: palette.accent2 },
            },
          ],
        },
      ],
    };
  }, [categoryAverages, palette]);

  const chartOption =
    view === '3d-skills' ? skills3DOption : view === '3d-category' ? category3DOption : radarOption;

  return (
    <div className="skills-charts">
      <div className="skills-charts__toolbar glass">
        <div className="skills-charts__views" role="tablist" aria-label="Chart views">
          {[
            { id: '3d-skills', label: '3D Skills' },
            { id: '3d-category', label: '3D Categories' },
            { id: 'radar', label: 'Radar Graph' },
          ].map((item) => (
            <button
              key={item.id}
              type="button"
              role="tab"
              aria-selected={view === item.id}
              className={`skills-charts__chip ${view === item.id ? 'is-active' : ''}`}
              onClick={() => setView(item.id)}
            >
              {item.label}
            </button>
          ))}
        </div>

        {view === '3d-skills' && (
          <div className="skills-charts__filters" role="tablist" aria-label="Skill categories">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                className={`skills-charts__chip ${activeCategory === cat ? 'is-active' : ''}`}
                onClick={() => setActiveCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        )}

        <p className="skills-charts__hint">
          Drag to rotate · Scroll to zoom · Hover bars for details
        </p>
      </div>

      <RevealChart>
        <div className="glass skills-charts__canvas">
          <ReactECharts
            key={`${view}-${activeCategory}-${theme}`}
            option={chartOption}
            style={{ height: view === 'radar' ? 420 : 480, width: '100%' }}
            opts={{ renderer: 'canvas' }}
            notMerge
            lazyUpdate
          />
        </div>
      </RevealChart>

      <div className="skills-charts__legend">
        {(view === 'radar' || view === '3d-category' ? categoryAverages : filteredSkills.slice(0, 8)).map(
          (item) => (
            <div key={item.name || item._id} className="skills-charts__legend-item glass">
              <strong>{item.name}</strong>
              <span>{item.value ?? item.level}%</span>
            </div>
          )
        )}
      </div>
    </div>
  );
}

function RevealChart({ children }) {
  return <div className="skills-charts__frame">{children}</div>;
}
