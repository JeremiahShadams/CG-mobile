import { useState } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChevronRight, ExternalLink, LogOut, PenLine } from 'lucide-react-native';
import { SettingsSection } from '@/components/SettingsSection';
import { Toggle } from '@/components/Toggle';
import { profile } from '@/data/fixtures';

/** Account settings — design #12. */
export default function AccountScreen() {
  const [analysisDone, setAnalysisDone] = useState(true);
  const [lawyerAssigned, setLawyerAssigned] = useState(true);
  const [securityAlerts, setSecurityAlerts] = useState(true);
  const [twoFactor, setTwoFactor] = useState(false);

  return (
    <View className="flex-1 bg-canvas">
      <SafeAreaView className="flex-1" edges={['top']}>
        <View className="shrink-0 px-5 pb-4 pt-4">
          <Text className="text-[22px] font-semibold tracking-tight text-ink">
            Account Settings
          </Text>
        </View>
        <ScrollView className="flex-1 px-5 pb-8" contentContainerStyle={{ gap: 16 }}>
          <SettingsSection title="Profile" defaultOpen>
            <View className="flex-row items-center gap-4 py-3">
              <View className="h-[52px] w-[52px] items-center justify-center rounded-full border border-line bg-canvas">
                <Text className="text-[18px] font-semibold text-navy">{profile.initials}</Text>
              </View>
              <View className="flex-1">
                <Text className="text-[16px] font-medium text-ink">{profile.name}</Text>
                <Text className="mt-0.5 text-[13px] text-sub">{profile.email}</Text>
              </View>
            </View>
            <Pressable className="mt-2 flex-row items-center gap-1.5 active:opacity-70">
              <PenLine size={14} color="#0B1220" />
              <Text className="text-[13px] font-medium text-navy">Edit profile</Text>
            </Pressable>
          </SettingsSection>

          <SettingsSection title="Plan & Usage" defaultOpen>
            <View className="mb-4 flex-row items-center justify-between pt-2">
              <Text className="text-[15px] font-medium text-ink">Professional Plan</Text>
              <View className="rounded-md border border-risk-safeBorder bg-risk-safeBg px-2 py-0.5">
                <Text className="text-[11px] font-semibold uppercase tracking-wide text-risk-safe">
                  Active
                </Text>
              </View>
            </View>
            <View className="mb-5">
              <View className="mb-2 flex-row items-center justify-between">
                <Text className="text-[13px] font-medium text-ink">Scans remaining</Text>
                <Text className="text-[13px] text-sub">7 of 10 used</Text>
              </View>
              <View className="h-[6px] w-full overflow-hidden rounded-full border border-line bg-canvas">
                <View className="h-full w-[70%] rounded-full bg-navy" />
              </View>
              <Text className="mt-2 text-[12px] text-sub">Next billing date: Dec 15, 2024</Text>
            </View>
            <Pressable className="rounded-lg border border-line bg-surface py-2.5 active:bg-canvas">
              <Text className="text-center text-[14px] font-medium text-ink">
                Upgrade to Premium
              </Text>
            </Pressable>
          </SettingsSection>

          <SettingsSection title="Billing">
            <View className="border-b border-line py-3">
              <Text className="mb-1 text-[12px] text-sub">Last invoice (Nov 15, 2024)</Text>
              <View className="flex-row items-center justify-between">
                <Text className="text-[14px] font-medium text-ink">#CG-2024-1102</Text>
                <Text className="text-[14px] font-medium text-ink">$29.99</Text>
              </View>
            </View>
            <View className="border-b border-line py-3">
              <Text className="mb-1 text-[12px] text-sub">Payment method</Text>
              <Text className="text-[14px] font-medium text-ink">Visa ending in 4242</Text>
            </View>
            <RowLink label="View all invoices" />
            <RowLink label="Update payment method" last />
          </SettingsSection>

          <SettingsSection title="Notifications">
            <ToggleRow label="Analysis complete" value={analysisDone} onChange={setAnalysisDone} />
            <ToggleRow label="Lawyer assigned" value={lawyerAssigned} onChange={setLawyerAssigned} />
            <ToggleRow label="Security alerts" value={securityAlerts} onChange={setSecurityAlerts} last />
            <RowLink label="Advanced preferences" last />
          </SettingsSection>

          <SettingsSection title="Security">
            <RowLink label="Change password" />
            <View className="flex-row items-center justify-between border-b border-line py-3.5">
              <View>
                <Text className="text-[14px] text-ink">Two-factor authentication</Text>
                <Text className="mt-0.5 text-[12px] text-sub">Recommended</Text>
              </View>
              <Toggle value={twoFactor} onChange={setTwoFactor} />
            </View>
            <View className="flex-row items-center justify-between py-2.5">
              <View>
                <Text className="text-[14px] text-ink">Active sessions</Text>
                <Text className="mt-0.5 text-[12px] text-sub">1 device currently logged in</Text>
              </View>
              <ChevronRight size={18} color="#667085" />
            </View>
          </SettingsSection>

          <SettingsSection title="Privacy">
            <Text className="mb-2 pt-2 text-[13px] text-sub">
              Manage how your data is used and stored across the ContractGuard platform.
            </Text>
            <RowLink label="Data usage preferences" />
            <RowLink label="Export my data" />
            <ExternalRow label="Privacy policy" />
          </SettingsSection>

          <View className="overflow-hidden rounded-xl border border-line bg-surface px-4 py-1">
            <RowLink label="Help center" />
            <RowLink label="Contact support" />
            <RowLink label="Report a bug" />
            <ExternalRow label="Terms of service" last />
          </View>

          <SettingsSection title="Danger Zone" danger>
            <Text className="mb-4 pt-1 text-[13px] text-risk-critical">
              Permanently delete your account and all associated contract data. This action cannot
              be undone.
            </Text>
            <Pressable className="rounded-lg border border-risk-criticalBorder bg-surface py-2.5 active:bg-risk-criticalBg">
              <Text className="text-center text-[14px] font-medium text-risk-critical">
                Delete account
              </Text>
            </Pressable>
          </SettingsSection>

          <View className="pb-2 pt-4">
            <Pressable className="flex-row items-center justify-center gap-2 rounded-xl bg-navy py-4 active:opacity-90">
              <LogOut size={18} color="#FFFFFF" />
              <Text className="font-medium text-white">Sign out</Text>
            </Pressable>
            <Text className="mt-4 text-center text-[11px] text-sub">
              ContractGuard v1.2.0 (428)
            </Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

function RowLink({ label, last = false }: { label: string; last?: boolean }) {
  return (
    <Pressable
      className={`flex-row items-center justify-between py-3 active:opacity-70 ${last ? '' : 'border-b border-line'}`}
    >
      <Text className="text-[14px] text-ink">{label}</Text>
      <ChevronRight size={18} color="#667085" />
    </Pressable>
  );
}

function ExternalRow({ label, last = false }: { label: string; last?: boolean }) {
  return (
    <Pressable
      className={`flex-row items-center justify-between py-3 active:opacity-70 ${last ? '' : 'border-b border-line'}`}
    >
      <Text className="text-[14px] text-ink">{label}</Text>
      <ExternalLink size={14} color="#667085" />
    </Pressable>
  );
}

function ToggleRow({
  label,
  value,
  onChange,
  last = false,
}: {
  label: string;
  value: boolean;
  onChange: (v: boolean) => void;
  last?: boolean;
}) {
  return (
    <View
      className={`flex-row items-center justify-between py-3.5 ${last ? '' : 'border-b border-line'}`}
    >
      <Text className="text-[14px] text-ink">{label}</Text>
      <Toggle value={value} onChange={onChange} />
    </View>
  );
}
