import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import BuilderTab from "../tab-builder";
import { TabSetting } from "../tab-setting";
import { TabSubmitted } from "../tab-submitted";

export const FormTabs = () => {
  return (
    <Tabs defaultValue="builder" className="w-full">
      <TabsList className="w-full justify-start">
        <TabsTrigger value="builder" className="flex-1">
          Builder
        </TabsTrigger>
        <TabsTrigger value="settings" className="flex-1">
          Settings
        </TabsTrigger>

        <TabsTrigger value="submitted" className="flex-1">
          Submitted Forms
        </TabsTrigger>
      </TabsList>
      <TabsContent value="builder" className="w-full">
        <BuilderTab />
      </TabsContent>

      <TabsContent value="settings" className="w-full">
        <TabSetting />
      </TabsContent>

      <TabsContent value="submitted" className="w-full">
        <TabSubmitted />
      </TabsContent>
    </Tabs>
  );
};
