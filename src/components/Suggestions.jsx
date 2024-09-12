import React from "react";
import { Tabs, Tab } from "@nextui-org/react";
import { SpellCheck2Icon, WholeWordIcon } from "lucide-react";
import Markdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import SuggestionCard from "../components/SuggestionCard";

const Suggestions = ({ grammar, keywords, refetch, loading }) => {
  return (
    <div className="flex items-center flex-col gap-1 w-full">
      <Tabs
        aria-label="Features"
        size="lg"
        color="primary"
        className="max-w-full"
      >
        <Tab key="grammar" title="Check Grammar" className="w-full max-w-3xl">
          <SuggestionCard
            icon={<SpellCheck2Icon className="stroke-primary-500" />}
            title="Grammar Suggestions"
            loading={loading}
            refetch={refetch}
          >
            <Markdown className="prose prose-sm" rehypePlugins={[rehypeRaw]}>
              {grammar}
            </Markdown>
          </SuggestionCard>
        </Tab>
        <Tab
          key="keywords"
          title="Optimize Keywords"
          className="w-full max-w-3xl"
        >
          <SuggestionCard
            icon={<WholeWordIcon className="stroke-primary-500" />}
            title="Keywords Suggestions"
            loading={loading}
            refetch={refetch}
          >
            <div className="prose">
              <ul>
                {keywords?.map((keywordString, index) => {
                  const keyword = keywordString.split(";")[0];
                  const description = keywordString.split(";")[1];

                  return (
                    <li key={`${index}-${keywordString}`}>
                      {keyword && <h4 className="capitalize">{keyword}</h4>}
                      {description && (
                        <p className="first-letter:uppercase">{`${description}${
                          description[description.length - 1] !== "." ? "." : ""
                        }`}</p>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          </SuggestionCard>
        </Tab>
      </Tabs>
    </div>
  );
};

export default Suggestions;
