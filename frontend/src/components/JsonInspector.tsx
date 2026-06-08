import React, { useState, useMemo } from "react";
import { ChevronRight, ChevronDown, Copy, Check, Search, Minimize2, Maximize2 } from "lucide-react";
import { Button } from "./ui/button";

interface JsonInspectorProps {
  data: any;
  title?: string;
}

export function JsonInspector({ data, title = "Raw JSON Payload" }: JsonInspectorProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [copied, setCopied] = useState(false);
  const [globalExpandState, setGlobalExpandState] = useState<'expand' | 'collapse' | null>(null);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(JSON.stringify(data, null, 2));
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy JSON:", err);
    }
  };

  const expandAll = () => setGlobalExpandState('expand');
  const collapseAll = () => setGlobalExpandState('collapse');

  return (
    <div className="flex flex-col rounded-xl border border-border bg-card/60 overflow-hidden backdrop-blur-md">
      {/* Header bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border bg-secondary/30 px-4 py-3">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
          <h3 className="text-xs font-semibold tracking-wider uppercase text-muted-foreground">{title}</h3>
        </div>
        
        <div className="flex items-center gap-2 flex-1 md:flex-initial max-w-sm w-full md:w-auto">
          <div className="relative w-full">
            <Search className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search keys or values..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setGlobalExpandState('expand'); // Auto-expand on search
              }}
              className="w-full rounded-md border border-border bg-background/50 pl-8 pr-3 py-1.5 text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-accent"
            />
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          <Button variant="outline" size="sm" onClick={expandAll} className="h-8 px-2 text-[11px] border-border hover:bg-secondary/50">
            <Maximize2 className="mr-1 h-3 w-3" /> Expand All
          </Button>
          <Button variant="outline" size="sm" onClick={collapseAll} className="h-8 px-2 text-[11px] border-border hover:bg-secondary/50">
            <Minimize2 className="mr-1 h-3 w-3" /> Collapse All
          </Button>
          <Button variant="outline" size="sm" onClick={handleCopy} className="h-8 px-2.5 text-[11px] border-border hover:bg-secondary/50">
            {copied ? (
              <>
                <Check className="mr-1 h-3 w-3 text-emerald-500" /> Copied!
              </>
            ) : (
              <>
                <Copy className="mr-1 h-3 w-3" /> Copy JSON
              </>
            )}
          </Button>
        </div>
      </div>

      {/* JSON content */}
      <div className="p-5 font-mono text-xs overflow-auto max-h-[70vh] bg-card/20 text-foreground selection:bg-accent/30 leading-relaxed">
        <JsonNode 
          value={data} 
          name="root" 
          isLast={true} 
          searchQuery={searchQuery}
          globalExpandState={globalExpandState}
          resetGlobalState={() => setGlobalExpandState(null)}
          depth={0}
        />
      </div>
    </div>
  );
}

interface JsonNodeProps {
  value: any;
  name?: string;
  isLast: boolean;
  searchQuery: string;
  globalExpandState: 'expand' | 'collapse' | null;
  resetGlobalState: () => void;
  depth: number;
}

function JsonNode({
  value,
  name,
  isLast,
  searchQuery,
  globalExpandState,
  resetGlobalState,
  depth,
}: JsonNodeProps) {
  const isObject = value !== null && typeof value === "object";
  const isArray = Array.isArray(value);
  
  // Default expanded for root or search results, collapsed for deeper nodes
  const [isCollapsed, setIsCollapsed] = useState(depth > 1);

  // Sync with global expand/collapse controls
  React.useEffect(() => {
    if (globalExpandState === 'expand') {
      setIsCollapsed(false);
      resetGlobalState();
    } else if (globalExpandState === 'collapse') {
      setIsCollapsed(true);
      resetGlobalState();
    }
  }, [globalExpandState, resetGlobalState]);

  // Expand if search query matches something inside
  const hasSearchMatch = useMemo(() => {
    if (!searchQuery) return false;
    const query = searchQuery.toLowerCase();
    
    // Check if key name matches
    if (name && name.toLowerCase().includes(query)) return true;
    
    // Check if primitive value matches
    if (!isObject) {
      return String(value).toLowerCase().includes(query);
    }
    
    // Check recursively if nested values match (deep search)
    try {
      const jsonStr = JSON.stringify(value).toLowerCase();
      return jsonStr.includes(query);
    } catch {
      return false;
    }
  }, [value, name, searchQuery, isObject]);

  React.useEffect(() => {
    if (hasSearchMatch && searchQuery) {
      setIsCollapsed(false);
    }
  }, [hasSearchMatch, searchQuery]);

  // Render Highlighted text for keys/values
  const renderHighlightedText = (text: string, highlight: string, className: string) => {
    if (!highlight) return <span className={className}>{text}</span>;
    
    const parts = text.split(new RegExp(`(${highlight.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&')})`, 'gi'));
    return (
      <span className={className}>
        {parts.map((part, i) => 
          part.toLowerCase() === highlight.toLowerCase() ? (
            <mark key={i} className="bg-yellow-500/35 text-foreground px-0.5 rounded-sm">{part}</mark>
          ) : (
            part
          )
        )}
      </span>
    );
  };

  const label = name ? (
    <span className="text-sky-400 dark:text-sky-400/90 font-medium select-none mr-1">
      {renderHighlightedText(`"${name}"`, searchQuery, "")}
      <span className="text-muted-foreground mr-1">:</span>
    </span>
  ) : null;

  if (!isObject) {
    // Primitive types rendering
    let valueElement;
    if (typeof value === "string") {
      valueElement = renderHighlightedText(`"${value}"`, searchQuery, "text-emerald-500 dark:text-emerald-400");
    } else if (typeof value === "number") {
      valueElement = renderHighlightedText(String(value), searchQuery, "text-amber-500 dark:text-amber-400");
    } else if (typeof value === "boolean") {
      valueElement = renderHighlightedText(String(value), searchQuery, "text-indigo-400 dark:text-indigo-300 font-semibold");
    } else if (value === null) {
      valueElement = <span className="text-gray-400 font-semibold">null</span>;
    } else {
      valueElement = <span>{String(value)}</span>;
    }

    return (
      <div className="pl-4 hover:bg-secondary/20 rounded-sm py-0.5 transition-colors">
        {label}
        {valueElement}
        {!isLast && <span className="text-muted-foreground">,</span>}
      </div>
    );
  }

  // Object / Array rendering
  const keys = isArray ? [] : Object.keys(value);
  const size = isArray ? value.length : keys.length;
  
  const bracketOpen = isArray ? "[" : "{";
  const bracketClose = isArray ? "]" : "}";
  const typeLabel = isArray ? "array" : "object";
  const sizeLabel = isArray ? `${size} items` : `${size} keys`;

  if (size === 0) {
    return (
      <div className="pl-4 py-0.5">
        {label}
        <span className="text-muted-foreground">{bracketOpen + bracketClose}</span>
        {!isLast && <span className="text-muted-foreground">,</span>}
      </div>
    );
  }

  return (
    <div className="relative pl-1 select-none">
      {/* Node Header */}
      <div 
        className="flex items-center hover:bg-secondary/20 rounded-sm py-0.5 cursor-pointer transition-colors group"
        onClick={() => setIsCollapsed(!isCollapsed)}
      >
        <span className="text-muted-foreground mr-0.5 hover:text-foreground">
          {isCollapsed ? <ChevronRight className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}
        </span>
        {label}
        <span className="text-muted-foreground font-semibold">{bracketOpen}</span>
        
        {isCollapsed && (
          <span 
            className="mx-1 px-1 py-0.2 text-[10px] rounded bg-secondary text-muted-foreground border border-border/50 group-hover:bg-secondary/80 group-hover:text-foreground transition-all select-none"
          >
            {sizeLabel}
          </span>
        )}
        
        {isCollapsed && <span className="text-muted-foreground font-semibold">{bracketClose}</span>}
        {isCollapsed && !isLast && <span className="text-muted-foreground">,</span>}
      </div>

      {/* Node Children (Recursive) */}
      {!isCollapsed && (
        <div className="relative pl-4 border-l border-border/40 ml-2.5 my-0.5 space-y-0.5">
          {isArray ? (
            value.map((item: any, i: number) => (
              <JsonNode
                key={i}
                value={item}
                isLast={i === size - 1}
                searchQuery={searchQuery}
                globalExpandState={globalExpandState}
                resetGlobalState={resetGlobalState}
                depth={depth + 1}
              />
            ))
          ) : (
            keys.map((key: string, i: number) => (
              <JsonNode
                key={key}
                name={key}
                value={value[key]}
                isLast={i === size - 1}
                searchQuery={searchQuery}
                globalExpandState={globalExpandState}
                resetGlobalState={resetGlobalState}
                depth={depth + 1}
              />
            ))
          )}
        </div>
      )}

      {/* Closing Bracket (when expanded) */}
      {!isCollapsed && (
        <div className="pl-4 py-0.5 text-muted-foreground font-semibold">
          {bracketClose}
          {!isLast && <span>,</span>}
        </div>
      )}
    </div>
  );
}
