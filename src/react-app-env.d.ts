/// <reference types="react-scripts" />

// Multi-approach type declarations for Sankhya web components
// This ensures compatibility with both old and new JSX transforms

// Approach 1: Global namespace (for jsx: "react")
declare global {
    namespace JSX {
        interface IntrinsicElements {
            'ez-card-item': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & { slot?: string };
            'ez-empty-card': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
            'ez-button': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
            'ez-grid': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & { dataUnit?: any; striped?: boolean; hover?: boolean; canEdit?: boolean; onEzDoubleClick?: (e: any) => void };
            'ez-calendar': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
                value?: Date;
                time?: boolean;
                'show-seconds'?: boolean;
                floating?: boolean;
                onEzChange?: (e: any) => void;
            };
            'stack-item': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
        }
    }
}

// Approach 2: Module augmentation (for jsx: "react-jsx")
declare module 'react' {
    namespace JSX {
        interface IntrinsicElements {
            'ez-card-item': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & { slot?: string };
            'ez-empty-card': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
            'ez-button': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
            'ez-grid': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & { dataUnit?: any; striped?: boolean; hover?: boolean; canEdit?: boolean; onEzDoubleClick?: (e: any) => void };
            'ez-calendar': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
                value?: Date;
                time?: boolean;
                'show-seconds'?: boolean;
                floating?: boolean;
                onEzChange?: (e: any) => void;
            };
            'stack-item': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
        }
    }
}

export { };
