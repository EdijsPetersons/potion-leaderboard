'use client'

import React from 'react'
import { FlaskConical } from 'lucide-react';
import { useQueryState, parseAsString } from 'nuqs';
import { TokenStat } from '@/types';
import { columns } from '@/app/(leaderboards)/trader/[walletAddress]/columns'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { DataTable } from '@/components/data-table';
import { TableFilters } from '@/components/table-filters';
import { TableSearch } from '@/components/table-search';
import { allTradeFilters, tradefilterLabels } from '@/constants/filters';

export default function TradesDataTables({
  data
}: { data: TokenStat[] }) {
  const searchKey = "tokenName";
  const [activeTab, setActiveTab] = useQueryState(
		"tab",
		parseAsString.withDefault("trades"),
	);
  
  return (
		<Tabs
			defaultValue="traders"
			className="flex flex-col h-full w-full"
			value={activeTab}
			onValueChange={setActiveTab}
		>
			<div className="flex flex-col md:flex-row gap-4 lg:gap-0 md:items-center md:justify-between">
				<div className="flex md:gap-16 justify-between md:justify-normal items-center">
					<TabsList className="p-0 md:p-1 justify-start md:justify-center">
						<TabsTrigger value="trades">Trades</TabsTrigger>
						<TabsTrigger value="tokens">Tokens</TabsTrigger>
						<TabsTrigger value="groups">Groups</TabsTrigger>
					</TabsList>
				</div>
				{activeTab === "trades" && (
					<div className="w-full flex items-center gap-4 md:w-96">
						<TableSearch
							searchKey={searchKey}
							placeholderText="Search by token or contract address"
						/>
						<TableFilters
							filters={allTradeFilters}
							labels={tradefilterLabels}
						/>
					</div>
				)}
			</div>
			<TabsContent value="trades" className="py-4 flex-1 space-y-4 h-full">
				<DataTable
					columns={columns}
					searchKey={searchKey}
					data={data}
					filters={allTradeFilters}
					isLoading={false}
				/>
			</TabsContent>
			<TabsContent value="tokens" className="py-4 space-y-4 h-full">
				<div className="h-full bg-primary-foreground rounded-xl p-16 flex-1 w-full flex justify-center items-center">
					<div className="flex flex-col items-center gap-2">
						<FlaskConical className="w-24 h-24 rotate-12" />
						<p className="text-2xl">Coming Soon!</p>
					</div>
				</div>
			</TabsContent>
			<TabsContent value="groups" className="py-4 space-y-4 h-full">
				<div className="h-full bg-primary-foreground rounded-xl p-16 flex-1 w-full flex justify-center items-center">
					<div className="flex flex-col items-center gap-2">
						<FlaskConical className="w-24 h-24 rotate-12" />
						<p className="text-2xl">Coming Soon!</p>
					</div>
				</div>
			</TabsContent>
		</Tabs>
	);
}
