# ROLE
CREATE ROLE ember WITH LOGIN PASSWORD 'emberspirit'
ALTER ROLE ember CREATEDB;

# DATABASE
CREATE DATABASE ember;

# TABLES
# Financial statements need 3 things,
# - Balance sheets
# - Income statement
# - Cash flow statement

# ======================================
# BALANCE SHEETS
# ======================================
#
# Formula for balance sheets
# Assets = Liabilities + Equity
#
CREATE TABLE balance_sheets {
  id UUID PRIMARY KEY NOT NULL,
  timestamp TIMESTAMPTZ,
  asset_id UUID,
  liabilities_id UUID,
  equity_id UUID
}

# ======================================
# ASSETS
# ======================================
# 
# Assets
#     Current Assets
#         Cash and cash equivalent
#         Notes and account receivable - net
#         Inventories
#             x
#         Other assets
#             y
#
#     Investments, advances and long-term receivables
#         Crypto
#             Bitcoin
#             Ether
#             Cardano
#         Stocks
#             Square
#             $SPY
#     Property, plant and equipment - net
#         GPU mining plant
#     Other assets, including intangibles - net
#     Total
CREATE TABLE assets {
  id UUID PRIMARY KEY NOT NULL,
  cash_and_cash_equivalent NUMERIC,
  bank_notes NUMERIC,
  inventories jsonb,
}