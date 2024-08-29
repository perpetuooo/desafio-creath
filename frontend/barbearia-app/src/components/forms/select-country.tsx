// src/components/forms/select-country.tsx
import React from 'react';
import Select from 'react-select';
import Flag from 'react-world-flags';

interface CountryOption {
  value: string;
  flag: string;
  label: string;
}

const countries: CountryOption[] = [
  { value: 'us', flag: 'US', label: 'EUA' },
  { value: 'br', flag: 'BR', label: 'BR' },
  { value: 'fr', flag: 'FR', label: 'FRA' },
];

const customSingleValue: React.FC<{ data: CountryOption }> = ({ data }) => (
  <div style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
    <Flag code={data.flag} style={{ width: 24, height: 16, marginRight: 8 }} />
    <span>{data.label}</span>
  </div>
);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const customOption: React.FC<any> = (props) => (
  <div {...props.innerProps} style={{ display: 'flex', alignItems: 'center', padding: 2 }}>
    <Flag code={props.data.flag} style={{ width: 24, height: 16, marginRight: 8 }} />
    <span>{props.data.label}</span>
  </div>
);

export function SelectCountry() {
  return (
    <Select<CountryOption>
      options={countries}
      getOptionValue={(option) => option.value}
      components={{ SingleValue: customSingleValue, Option: customOption }}
      isSearchable={false}
      styles={{
        control: (provided) => ({
          ...provided,
          width: '100%',
          height: 40,
          boxShadow: 'none',
          borderColor: '#D1D5DB',
          display: 'flex',
          alignItems: 'center',
        }),
        singleValue: (provided) => ({
          ...provided,
          margin: 0,
          display: 'flex',
          alignItems: 'center',
          height: '100%',
          padding: 0,
        }),
        valueContainer: (provided) => ({
          ...provided,
          padding: '0 8px',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
        }),
        menu: (provided) => ({
          ...provided,
          width: '100%',
          margin: 0,
          padding: 0,
          boxShadow: 'none',
        }),
        menuList: (provided) => ({
          ...provided,
          padding: 0,
          margin: 0,
        }),
        option: (provided) => ({
          ...provided,
          display: 'flex',
          alignItems: 'center',
        }),
      }}
    />
  );
}
