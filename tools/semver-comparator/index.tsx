import { FaqItem } from '@/lib/types';

export const faq: FaqItem[] = [
    { q: 'What is semantic versioning?', a: 'Semantic versioning (semver) is a versioning scheme that uses a three-part version number: MAJOR.MINOR.PATCH. MAJOR increments for breaking changes, MINOR for new backward-compatible features, and PATCH for backward-compatible bug fixes. It was created by Tom Preston-Werner (co-founder of GitHub) and is specified at semver.org.' },
    { q: 'When should I increment the major version?', a: 'Increment the major version when you make incompatible API changes. Examples: removing a public function, changing a function\'s signature, renaming a public class, changing the behavior of an existing feature in a way that breaks existing code. Major version 0 (0.y.z) is for initial development — the public API is not yet stable and anything may change.' },
    { q: 'When should I increment the minor version?', a: 'Increment the minor version when you add new functionality in a backward-compatible manner. Examples: adding new public functions or methods, adding new optional parameters, adding new endpoints to an API. Existing code that uses the library continues to work without modification.' },
    { q: 'When should I increment the patch version?', a: 'Increment the patch version when you make backward-compatible bug fixes that do not change the public API. Examples: fixing a calculation error, fixing a crash, improving performance without changing behavior. If you release a patch, reset the patch number and bump minor: 1.4.2 → 1.5.0, not 1.4.3.' },
    { q: 'What are pre-release versions?', a: 'Pre-release versions have a hyphen suffix: 1.0.0-alpha, 1.0.0-beta.1, 1.0.0-rc.2. Pre-release versions indicate instability and have lower precedence than the release version: 1.0.0-alpha < 1.0.0-beta < 1.0.0. Numeric pre-release identifiers are compared numerically (alpha.1 < alpha.2 < alpha.10), while alphanumeric identifiers are compared lexically.' },
    { q: 'What is build metadata in semver?', a: 'Build metadata is appended with a plus sign: 1.0.0+build.20240115. Build metadata is ignored when determining version precedence — 1.0.0+001 and 1.0.0+20240115 are considered equal. It is used to identify specific builds (CI run IDs, commit SHAs, build timestamps) without affecting version ordering.' },
    { q: 'What do npm semver range operators mean?', a: 'npm supports these range operators: ^ (caret) allows minor and patch updates within the same major (^1.2.3 = >=1.2.3 <2.0.0). ~ (tilde) allows only patch updates (˜1.2.3 = >=1.2.3 <1.3.0). >= allows any version at or above the specified. * or x is a wildcard matching any version. 1.x.x = any minor/patch of major 1.' },
    { q: 'Does 0.x.x mean the same as 1.x.x?', a: 'No. Major version zero (0.y.z) is a special case in semver: the public API is considered unstable and anything may change at any time. A 0.y.z → 0.y+1.z change may contain breaking changes even though only the minor version was bumped. Production dependencies should typically use versions >= 1.0.0 where the stability guarantee applies.' },
    { q: 'Is my version string valid semver?', a: 'A valid semver version matches: MAJOR.MINOR.PATCH where each part is a non-negative integer with no leading zeros, optionally followed by a pre-release suffix (-alpha.1) and/or build metadata (+001). Examples: 1.0.0 ✓, 1.0.0-alpha ✓, 1.0.0-alpha.1+build ✓, 1.0 ✗ (missing patch), 1.0.0.0 ✗ (too many parts), 01.0.0 ✗ (leading zero).' },
];

export const sidebarInfo = [
    { label: '^1.2.3',  desc: '>=1.2.3 <2.0.0 — caret: minor+patch updates'  },
    { label: '~1.2.3',  desc: '>=1.2.3 <1.3.0 — tilde: patch updates only'   },
    { label: '>=1.2.3', desc: 'Any version 1.2.3 or higher'                   },
    { label: '1.x',     desc: '>=1.0.0 <2.0.0 — wildcard minor/patch'         },
    { label: '*',       desc: 'Any version (use with caution)'                  },
];
